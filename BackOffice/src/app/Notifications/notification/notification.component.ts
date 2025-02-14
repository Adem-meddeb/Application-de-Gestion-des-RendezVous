// Import des modules nécessaires
import { Component } from '@angular/core';
import { NotificationDetailsComponent } from '../notification-details/notification-details.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../Services/notification.service';
import { Notification } from '../notification.model';

/**
 * Composant de gestion des notifications
 * Responsabilités :
 * - Affichage de la liste des notifications
 * - Gestion de l'ouverture des détails
 * - Suivi des notifications non lues
 */
@Component({
  selector: 'app-notification', // Sélecteur HTML du composant
  standalone: false, // Composant traditionnel (nécessite un module parent)
  templateUrl: './notification.component.html', // Template associé
  styleUrl: './notification.component.css' // Feuille de style CSS
})
export class NotificationComponent {
  // Liste des notifications à afficher
  notifications: Notification[];

  // Injection des dépendances
  constructor(
    private dialog: MatDialog, // Service pour les boîtes de dialogue Material
    private notificationService: NotificationService // Service de gestion des notifications
  ) {
    // Initialisation des données depuis le service
    this.notifications = this.notificationService.getNotifications();
  }

  /**
   * Ouvre une notification dans une boîte de dialogue modale
   * @param notification - La notification sélectionnée
   */
  openNotification(notification: Notification): void {
    // Ouvre le composant de détail dans une boîte de dialogue
    const dialogRef = this.dialog.open(NotificationDetailsComponent, {
      width: '500px', // Taille fixe de la boîte de dialogue
      data: notification // Passage des données de la notification
    });

    // Marque la notification comme lue après ouverture
    this.notificationService.markAsRead(notification.id);
  }

  /**
   * Calcule le nombre de notifications non lues
   * @returns Le nombre de notifications non lues
   */
  unreadCount(): number {
    return this.notificationService.getUnreadCount();
  }

  // Méthode supplémentaire possible pour l'actualisation des données
  /*
  refreshNotifications(): void {
    this.notifications = this.notificationService.getNotifications();
  }
  */
}