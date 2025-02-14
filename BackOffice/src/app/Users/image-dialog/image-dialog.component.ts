// Import des modules Angular nécessaires
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  standalone: false,
  // Template inline avec encapsulation HTML et CSS
  template: `
    <div class="image-container">
      <!-- Affichage de l'image en pleine taille -->
      <img [src]="data.imageUrl" alt="Document agrandi" class="full-size-image">
    </div>
  `,
  // Styles CSS encapsulés pour ce composant
  styles: [`
    .image-container {
      max-width: 90vw; /* Largeur maximale de 90% de la largeur de la vue */
      max-height: 90vh; /* Hauteur maximale de 90% de la hauteur de la vue */
      overflow: auto; /* Défilement si l'image est trop grande */
      padding: 20px; /* Marge intérieure */
      background: rgba(0, 0, 0, 0.9); /* Fond semi-transparent noir */
    }
    .full-size-image {
      max-width: 100%; /* Adapté à la largeur du conteneur */
      max-height: 80vh; /* Garde un espace pour le padding */
      object-fit: contain; /* Conserve les proportions de l'image */
    }
  `]
})
export class ImageDialogComponent {
  /**
   * Constructeur avec injection des données de la boîte de dialogue
   * @param data Contient l'URL de l'image à afficher
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }) {}
}