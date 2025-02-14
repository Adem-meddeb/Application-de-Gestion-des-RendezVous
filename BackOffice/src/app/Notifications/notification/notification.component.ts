import { Component } from '@angular/core';
import { NotificationDetailsComponent } from '../notification-details/notification-details.component';
import { MatDialog } from '@angular/material/dialog';


interface Notification {
  id: number;
  title: string;
  message: string;
  date: Date;
  read: boolean;
}

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  notifications: Notification[] = [
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

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void { }

  openNotification(notification: Notification): void {
    this.dialog.open(NotificationDetailsComponent, {
      width: '500px',
      data: notification
    });

    // Marquer comme lu (optionnel)
    notification.read = true;
  }

  public unreadCount(): number {
    return this.notifications.filter(notification => !notification.read).length;
  }
}
