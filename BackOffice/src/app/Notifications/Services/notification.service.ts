// Import des décorateurs et modèles nécessaires
import { Injectable } from '@angular/core';
import { Notification } from '../notification.model';

// Décorateur Injectable permettant d'utiliser ce service dans toute l'application
@Injectable({
  providedIn: 'root' // Service disponible au niveau racine de l'application
})
export class NotificationService {
  // Liste privée de notifications initialisée avec des données de démo
  private notifications: Notification[] = [
    {
      id: 1,
      title: 'Nouveau message',
      message: 'Vous avez reçu un nouveau message de la part de Jean Dupont',
      date: new Date('2024-03-15'),
      read: false
    },
    {
      id: 2,
      title: 'Mise à jour système',
      message: 'Une mise à jour critique est disponible pour votre application',
      date: new Date('2024-03-14'),
      read: true
    }
  ];

  constructor() { 
    // Le constructeur est vide car nous n'avons pas besoin d'injecter de dépendances ici
  }

  /**
   * Récupère une copie de la liste des notifications
   * @returns Une copie du tableau de notifications pour éviter les modifications directes
   */
  getNotifications(): Notification[] {
    return this.notifications.slice(); // slice() crée une copie du tableau original
  }

  /**
   * Marque une notification comme lue
   * @param id - L'identifiant de la notification à marquer comme lue
   */
  markAsRead(id: number): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  }

  /**
   * Compte le nombre de notifications non lues
   * @returns Le nombre de notifications avec read: false
   */
  getUnreadCount(): number {
    return this.notifications.filter(notification => !notification.read).length;
  }

  /**
   * Ajoute une nouvelle notification à la liste
   * @param notification - La notification à ajouter (sans l'id qui est généré automatiquement)
   */
  addNotification(notification: Omit<Notification, 'id'>): void {
    // Génération d'un nouvel ID en incrémentant l'ID maximum existant
    const newId = Math.max(...this.notifications.map(n => n.id)) + 1;
    
    // Ajout de la nouvelle notification avec le nouvel ID
    this.notifications.push({
      id: newId,
      ...notification
    });
  }
}