import { Component } from '@angular/core';
import { NotificationDetailsComponent } from '../notification-details/notification-details.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../Services/notification.service';
import { Notification } from '../notification.model';

@Component({
  selector: 'app-notification',
  standalone: false,
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  notifications: Notification[];

  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.notifications = this.notificationService.getNotifications();
  }

  openNotification(notification: Notification): void {
    this.dialog.open(NotificationDetailsComponent, {
      width: '500px',
      data: notification
    });

    this.notificationService.markAsRead(notification.id);
  }

  unreadCount(): number {
    return this.notificationService.getUnreadCount();
  }
}