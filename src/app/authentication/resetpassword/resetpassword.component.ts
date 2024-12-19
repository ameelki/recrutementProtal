import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { LoadingService } from '../../services/loading.service';
import { PasswordResetRequest , AuthService, LoginFormRequest} from '../../services/auth.service';


@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss'
})
export class ResetpasswordComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router,   // Injectez ToastrService
  private loadingService :LoadingService) { }

  login() {
    const passwordResetRequest: PasswordResetRequest = {
      email: this.email,
      newPassword: this.password
    };
    this.loadingService.show();

    this.userService.resetPassword(passwordResetRequest).subscribe({
      next: (response) => {
        this.loadingService.hide();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Rsete Password successfully!',
        });
        

        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loadingService.hide();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error,
          footer: '<a href="">Why do I have this issue?</a>'
        });
      }
    }
      
    );
  }

  
}
