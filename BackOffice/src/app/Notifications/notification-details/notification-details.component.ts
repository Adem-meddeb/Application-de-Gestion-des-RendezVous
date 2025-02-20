// Import des modules nécessaires
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface NotificationDialogData {
  title: string;
  message: string;
  date: string;
  read: boolean;
}

/**
 * Composant d'affichage des détails d'une notification
 * Affiche le contenu complet d'une notification dans une boîte de dialogue
 */
@Component({
  selector: 'app-notification-details', // Sélecteur CSS du composant
  standalone: false, // Composant traditionnel (non standalone)
  templateUrl: './notification-details.component.html', // Template HTML
  styleUrl: './notification-details.component.css' // Feuille de style CSS
})
export class NotificationDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NotificationDialogData
  ) {}
}