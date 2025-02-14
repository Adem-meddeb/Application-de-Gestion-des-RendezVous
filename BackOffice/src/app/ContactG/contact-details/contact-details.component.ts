// Import des modules nécessaires
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Composant pour afficher les détails d'un message dans une boîte de dialogue
 */
@Component({
  selector: 'app-contact-details', // Sélecteur CSS du composant
  standalone: false, // Indique que le composant n'est pas autonome (fait partie d'un module)
  templateUrl: './contact-details.component.html', // Template HTML associé
  styleUrl: './contact-details.component.css' // Feuille de style CSS
})
export class ContactDetailsComponent {
  
  /**
   * Constructeur du composant de détail
   * @param dialogRef Référence à la boîte de dialogue Material
   * @param data Données injectées contenant le message à afficher
   */
  constructor(
    public dialogRef: MatDialogRef<ContactDetailsComponent>, // Permet de contrôler la boîte de dialogue
    @Inject(MAT_DIALOG_DATA) public data: { message: any } // Injection des données passées au dialogue
  ) { }
}