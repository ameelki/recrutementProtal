import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  // Méthode pour changer la langue
  onLanguageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedLanguage = selectElement.value;

    // Sauvegarder la langue dans le localStorage (ou dans un service si vous avez un service de localisation)
    localStorage.setItem('language', selectedLanguage);

    // Vous pouvez ajouter ici la logique pour changer la langue de l'application,
    // par exemple, recharger l'application avec la nouvelle langue ou appeler un service de traduction.

    // Exemple de redirection ou action après changement de langue
    this.router.navigate([this.router.url]);
  }
}