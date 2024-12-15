import { Routes } from '@angular/router';
import { JobDescriptionFormComponent } from './job-description-form/job-description-form.component';

export const routes: Routes = [
    { path: ':lang/create-job', component: JobDescriptionFormComponent }  ];