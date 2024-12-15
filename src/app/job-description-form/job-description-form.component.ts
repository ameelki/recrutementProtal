import { Component } from '@angular/core';
import {  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';  // MatFormFieldModule
import { MatInputModule } from '@angular/material/input';  // MatInputModule pour matInput
import { ReactiveFormsModule } from '@angular/forms';  
import { MatCardModule } from '@angular/material/card';  // Importer MatCardModule
import { CommonModule } from '@angular/common';
import { JobDescriptionRequest } from '../payload/JobDescriptionRequest';
import { JobDescriptionService } from '../services/job-description.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-job-description-form',
  standalone: true,
  imports: [
    MatFormFieldModule,  // Ajoutez les modules Angular Material ici
    MatInputModule,
    ReactiveFormsModule ,
    MatCardModule ,
    CommonModule ,
    // Si vous utilisez des formulaires réactifs
  ],
  templateUrl: './job-description-form.component.html',
  styleUrl: './job-description-form.component.css'
})
export class JobDescriptionFormComponent  {
  jobForm!: FormGroup;
  isFirstStepCompleted: boolean = false;

  constructor(private fb: FormBuilder,private jobService: JobDescriptionService) {
    this.jobForm = this.fb.group({
      title: ['',[Validators.required, this.maxLengthValidator(255)]],
      summary: ['',[Validators.required, this.maxLengthValidator(1000)]],
      responsibilities: ['', this.maxLengthValidator(1000)],
      isActiveForCandidates: [true, Validators.required],
      requiredSkills: ['', this.maxLengthValidator(1000)],
      requiredExperience: ['',this.maxLengthValidator(1000)],
      workingConditions: ['',this.maxLengthValidator(500)],
      benefits: ['', this.maxLengthValidator(500)],
      recruitmentProcess: ['',this.maxLengthValidator(255) ],
      companyDescription: ['', this.maxLengthValidator(500)],
      contactEmail: ['', [Validators.required, Validators.email]]
    });
  }

  maxLengthValidator(maxLength: number) {
    return (control: { value: string | any[]; }) => {
      if (control.value && control.value.length > maxLength) {
        Swal.fire({
          title: 'Character Limit Exceeded',
        text: `The description cannot exceed ${maxLength} characters. You have currently entered ${control.value.length} characters.`,
        icon: 'warning',
        confirmButtonText: 'OK'
        });
        return { maxLengthExceeded: true };

      }
      return null; // Aucun problème
    };
  }

  onSubmit(): void {

    Swal.fire({
      title: 'Creating Job Description...',
      text: 'Please wait while we process your request.',
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();  // Afficher l'animation de chargement
      }
    });
 if (this.jobForm.valid) {
      const jobDescription: JobDescriptionRequest = this.jobForm.value;
      
      this.jobService.createJobDescription(jobDescription).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Success!',
            text: 'Job Description created successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          //alert('Job Description created successfully'+ response);
        },
        error: (error) => {
          Swal.fire({
            title: 'Error!',
            text: 'There was an issue creating the Job Description.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error creating Job Description', error);
        },
        complete: () => {
          // Toujours cacher le loading, même si la requête a réussi ou échoué
          Swal.hideLoading();        }
      });
    } else {
  
      // Log invalid controls
      Object.keys(this.jobForm.controls).forEach(controlName => {
        const control = this.jobForm.get(controlName);
        if (control && control.invalid) {
          alert(`${controlName} is invalid`);

          Swal.fire({
            title: 'Error!',
            text: `${controlName} is invalid`,
            icon: 'success',
            confirmButtonText: 'OK'
          });
          
        }
      });
    }
  }
  
  
}
