import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

import { AppComponent } from './app.component';  // Votre composant racine
import { routes } from './app.routes';  // Si vous avez des routes à définir
import LoginComponent from './authentication/login/login.component';
import { HeaderComponent } from './header/header.component';
 


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent // Déclarez votre composant dans le module
  ],
  imports: [
    BrowserModule,
    HttpClientModule,  
    RouterOutlet,           // Ajoutez HttpClientModule ici
    ReactiveFormsModule,          // Pour les formulaires réactifs
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    CommonModule,                 // Pour ngIf, ngFor, etc.
    RouterModule.forRoot(routes), // Définition des routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
