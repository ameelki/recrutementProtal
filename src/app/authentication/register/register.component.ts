// angular import
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import Swal from 'sweetalert2';
import { User, UserService } from '../../services/user.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent {
  // public method
  
signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private router: Router,
    private loading: LoadingService
    
  ) {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(6)]], 
      password: ['', [Validators.required, Validators.minLength(6)]], // Validation mot de passe
          });
  }
  
  ngOnInit(): void {}

  onSubmit() {
 if (this.signUpForm.invalid) {
      Object.keys(this.signUpForm.controls).forEach(controlName => {
        const control = this.signUpForm.get(controlName);
        if (control && control.invalid) {
          Swal.fire({
            title: 'Error!',
            text: `${controlName} is invalid`,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
      return;
    }

    Swal.fire({
      title: 'Creating User',
      text: 'Please wait while we process your request.',
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Afficher l'animation de chargement
      }
    });
    const user: User = this.signUpForm.value; // Use the model here

    this.userservice.createUser(user).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User created successfully!',
        });
      
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.message,
        });
      }
    );
  }
}
