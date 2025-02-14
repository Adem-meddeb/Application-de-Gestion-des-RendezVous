// Import des modules nécessaires
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  /**
   * Constructeur du composant
   * @param notification Données de la notification injectées via MAT_DIALOG_DATA
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public notification: any // Type any à remplacer par une interface spécifique
  ) { 
    // Le décorateur @Inject(MAT_DIALOG_DATA) permet de récupérer les données passées au dialogue
    // Exemple d'utilisation idéale : notification: Notification (avec interface typée)
  }

  // Méthode optionnelle pour formater la date
  /*
  getFormattedDate(): string {
    return new Date(this.notification.date).toLocaleString();
  }
  */

  // Méthode optionnelle pour les actions sur la notification
  /*
  markAsRead(): void {
    // Implémenter la logique de mise à jour ici
  }
  */
}