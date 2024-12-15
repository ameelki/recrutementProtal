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
import { TranslationService } from '../services/TranslationService';

export interface Translations {
  TITLE: string;
  SUMMARY: string;
  RESPONSIBILITIES: string;
  IS_ACTIVE: string;
  REQUIRED_SKILLS: string;
  REQUIRED_EXPERIENCE: string;
  WORKING_CONDITIONS: string;
  BENEFITS: string;
  RECRUITMENT_PROCESS: string;
  COMPANY_DESCRIPTION: string;
  CONTACT_EMAIL: string;
  SUBMIT: string;
  CHARACTER_LIMIT_EXCEEDED: string;
  INVALID_EMAIL: string;
  REQUIRED: string;
  INVALID: string;
  MAX_LENGTH: string;
  OPTIONAL: string;
  CHARACTERS:string
}

interface TranslationData {
  en: Translations;
  fr: Translations;
  ar:Translations
}


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



export class JobDescriptionFormComponent implements OnInit {
  jobForm!: FormGroup;
  isFirstStepCompleted: boolean = false;
  currentLang: 'en' | 'fr' | 'ar' = 'en'; // Langue actuelle
  translations: any; // Traductions

  constructor(
    private fb: FormBuilder,
    private jobService: JobDescriptionService,
    private translationService: TranslationService // Injection du service
  ) {
    this.jobForm = this.fb.group({
      title: ['', [Validators.required, this.maxLengthValidator(255)]],
      summary: ['', [Validators.required, this.maxLengthValidator(1000)]],
      responsibilities: ['', this.maxLengthValidator(1000)],
      isActiveForCandidates: [true, Validators.required],
      requiredSkills: ['', this.maxLengthValidator(1000)],
      requiredExperience: ['', this.maxLengthValidator(1000)],
      workingConditions: ['', this.maxLengthValidator(500)],
      benefits: ['', this.maxLengthValidator(500)],
      recruitmentProcess: ['', this.maxLengthValidator(255)],
      companyDescription: ['', this.maxLengthValidator(500)],
      contactEmail: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Récupérer la langue de l'URL
    const lang = window.location.pathname.split('/')[1];
    if (lang && ['en', 'fr', 'ar'].includes(lang)) {
      this.translationService.setLanguage(lang as 'en' | 'fr' | 'ar'); // Définir la langue
    }

    // Charger les traductions correspondantes
    this.translations = this.translationService.getTranslations();
  }

  maxLengthValidator(maxLength: number) {
    return (control: { value: string | any[] }) => {
      if (control.value && control.value.length > maxLength) {
        Swal.fire({
          title: 'Character Limit Exceeded',
          text: `The description cannot exceed ${maxLength} characters. You have currently entered ${control.value.length} characters.`,
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return { maxLengthExceeded: true };
      }
      return null;
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
        Swal.showLoading(); // Afficher l'animation de chargement
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
          Swal.hideLoading(); // Masquer le loading
        }
      });
    } else {
      // Afficher une erreur pour les champs invalides
      Object.keys(this.jobForm.controls).forEach(controlName => {
        const control = this.jobForm.get(controlName);
        if (control && control.invalid) {
          alert(`${controlName} is invalid`);
          Swal.fire({
            title: 'Error!',
            text: `${controlName} is invalid`,
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    }
  }
}
