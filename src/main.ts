import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { JobDescriptionFormComponent } from './app/job-description-form/job-description-form.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes) , 
    provideHttpClient(withFetch()),
     // Fournir les routes ici
  ]
});
