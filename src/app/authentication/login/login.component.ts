// angular import
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { jwtDecode } from "jwt-decode";
import { LoadingService } from '../../services/loading.service';
import { AuthService, LoginFormRequest } from '../../services/auth.service';
import { JwtPayload } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router ,// Injectez ToastrService
  private loadingService :LoadingService) { }

  login() {
    const loginFormRequest: LoginFormRequest = {
      username: this.email,
      password: this.password
    };
  
    // Affichage de l'animation de chargement pendant l'authentification
    Swal.fire({
      title: 'Authenticating...',
      text: 'Please wait while we verify your credentials.',
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Afficher l'animation de chargement
      }
    });
  
    // Effectuer la requête d'authentification
    this.authService.login(loginFormRequest).subscribe({
      next: (response) => {
        // Stocker le token d'accès dans le localStorage
        localStorage.setItem('accessToken', response.accessToken);
        
        // Décoder le JWT pour obtenir les rôles de l'utilisateur
        const { roles } = this.decodeToken(response.accessToken);
  
        // Naviguer en fonction des rôles
        this.navigateBasedOnRole(roles);
  
        // Afficher un message de succès après une authentification réussie
        Swal.fire({
          title: 'Authentication Successful!',
          text: 'You have successfully logged in.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
        // Masquer le chargement
        this.loadingService.hide();
  
        // Afficher une alerte d'erreur si l'authentification échoue
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message || 'Authentication failed. Please check your credentials.',
          footer: '<a href="">Why do I have this issue?</a>',
          confirmButtonText: 'Try Again'
        });
      }
    });
  }

  private decodeToken(token: string): { roles: string[] } {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const roles = decoded.realm_access?.roles || [];
      return { roles };
    } catch (error) {
      console.error('Token decoding failed', error);
      return { roles: [] };
    }
  }

  private navigateBasedOnRole(roles: string[]): void {
    if (roles.includes('client')) {
      this.router.navigate(['en', 'create-job']);  // Redirection vers 'lang/create-job'
    } else if (roles.includes('simpleUser')) {
      this.router.navigate(['/sample-page']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}




