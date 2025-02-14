import { Injectable } from '@angular/core';
import { Notification } from '../notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

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

  constructor() { }

  getNotifications(): Notification[] {
    return this.notifications.slice();
  }

  markAsRead(id: number): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  }

  getUnreadCount(): number {
    return this.notifications.filter(notification => !notification.read).length;
  }

  addNotification(notification: Omit<Notification, 'id'>): void {
    const newId = Math.max(...this.notifications.map(n => n.id)) + 1;
    this.notifications.push({
      id: newId,
      ...notification
    });
  }
}
