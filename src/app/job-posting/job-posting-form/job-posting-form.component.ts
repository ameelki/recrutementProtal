import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { JobDescriptionService } from '../../services/job-description.service';
import { TranslationService } from '../../services/TranslationService';
import Swal from 'sweetalert2';
import { JobDescriptionRequest } from '../../payload/JobDescriptionRequest';

@Component({
  selector: 'app-job-posting-form',
  standalone: true,
  imports: [ MatFormFieldModule,  // Ajoutez les modules Angular Material ici
    MatInputModule,
    ReactiveFormsModule ,
    MatCardModule ,
    CommonModule ],
  templateUrl: './job-posting-form.component.html',
  styleUrl: './job-posting-form.component.css'
})
export class JobPostingFormComponent {

  jobForm!: FormGroup;

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
      companyDescription: ['', this.maxLengthValidator(500)],
      contactEmail: ['', [Validators.required, Validators.email]]
    });
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
  async onSubmit(): Promise<void> {
    // Afficher l'animation de chargement pendant que l'on vérifie la validité du formulaire
    Swal.fire({
      title: 'Creating Job Description...',
      text: 'Please wait while we process your request.',
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false
    });
  
    // Vérification si le formulaire est valide
    if (this.jobForm.valid) {
      const jobDescription: JobDescriptionRequest = this.jobForm.value;
  
      try {
        // Attente de la réponse du service (utilisation de promesses)
        const response = await this.jobService.createJobDescription(jobDescription).toPromise();
  
        // Fermer l'alerte de chargement
        Swal.close();
  
        // Afficher une alerte de succès
        Swal.fire({
          title: 'Success!',
          text: 'Job Description created successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          // Réinitialiser le formulaire en cas de succès
          this.jobForm.reset();  // Vider le formulaire
        });
      } catch (error) {
        // Fermer l'alerte de chargement en cas d'erreur
        Swal.close();
  
        // Afficher une alerte d'erreur avec message d'erreur spécifique
        Swal.fire({
          title: 'Error!',
          text:  'Something went wrong!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } else {
      // Si le formulaire est invalide, fermer l'animation de chargement immédiatement
      Swal.close();
  
      // Afficher une erreur pour chaque champ invalide
      for (const controlName of Object.keys(this.jobForm.controls)) {
        const control = this.jobForm.get(controlName);
        if (control && control.invalid) {
          Swal.fire({
            title: 'Error!',
            text: `${controlName} is invalid`,
            icon: 'error',
            confirmButtonText: 'OK'
          });
          break;  // Arrêter l'exécution dès qu'une erreur est trouvée
        }
      }
    }
  }
  

}
