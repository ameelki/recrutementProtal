import { Routes } from '@angular/router';
import LoginComponent from './authentication/login/login.component';
import RegisterComponent from './authentication/register/register.component';
import { JobPostingFormComponent } from './job-posting/job-posting-form/job-posting-form.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent } ,
    { path: 'register', component: RegisterComponent } ,
    { path: 'create-job', component: JobPostingFormComponent } 
    
    ];