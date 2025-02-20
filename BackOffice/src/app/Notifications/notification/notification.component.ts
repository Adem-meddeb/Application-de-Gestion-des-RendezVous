// Import des modules nécessaires
import { Component } from '@angular/core';
//import { NotificationDetailsComponent } from '../notification-details/notification-details.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService , AppNotification} from '../../Services/NotifService/notification.service';
//import { Notification } from '../notification.model';
import { Observable, Subscription } from 'rxjs';
import { FormatNotificationTypePipe } from '../Pipe/FormatNotifPipe/format-notification-type-pipe.pipe';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ChangeDetectorRef } from '@angular/core';
import { NotificationDetailsComponent } from '../notification-details/notification-details.component';

@Component({
  selector: 'app-notification', 
  standalone: false, // Composant traditionnel (nécessite un module parent)
  templateUrl: './notification.component.html', // Template associé
  styleUrl: './notification.component.css', // Feuille de style CSS
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class NotificationComponent {

  notifications$!: Observable<AppNotification[]>; // Definite assignment assertion
  notifications: AppNotification[] = []; // Array to hold notifications
  newNotification: AppNotification | null = null;
  private subscription!: Subscription;
  private alertTimeout: any;

  constructor(private notificationService: NotificationService , private cdr: ChangeDetectorRef , private dialog: MatDialog) {}

  ngOnInit(): void {
  const user = this.getCurrentUser();
  
  if (user) {
    this.notificationService.connect(user);
    this.subscription = this.notificationService.notifications$
      .subscribe(notifications => {
        this.notifications = notifications;
        this.cdr.detectChanges();
      });
  }
  }

  private getCurrentUser(): any {
  const userJson = localStorage.getItem('user');
  if (!userJson) {
    window.location.href = '/login';
    return null;
  }
  try {
    return JSON.parse(userJson);
  } catch (e) {
    localStorage.removeItem('user');
    window.location.href = '/login';
    return null;
  }
  }

  private initializeNotifications(userId: number): void {
    this.notificationService.connect(userId);

    this.subscription = this.notificationService.notifications$.subscribe({
      next: notifications => {
        this.notifications = notifications;
      },
      error: err => {
        console.error('Erreur de subscription:', err);
      }
    });
  }

  markAsRead(id: number): void {
    this.notificationService.markAsRead(id).subscribe({
      error: (err) => console.error('Échec de la mise à jour', err)
    });
  }

  showAlert(notification: AppNotification): void {
    this.newNotification = notification;
    this.alertTimeout = setTimeout(() => this.dismissAlert(), 5000);
  }

  dismissAlert(): void {
    this.newNotification = null;
    clearTimeout(this.alertTimeout);
  }

  getIcon(type: string): string {
    const icons: { [key: string]: string } = {
      info: 'info',
      warning: 'warning',
      error: 'error',
      success: 'check_circle'
    };
    return icons[type.toLowerCase()] || 'notifications';
  }

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.notificationService.disconnect();
    clearTimeout(this.alertTimeout);
  }

  // Modifier la méthode d'ouverture de notification
  openNotificationDetails(notification: AppNotification): void {
    if (!notification.read) {
      this.notificationService.markAsRead(notification.id).subscribe(() => {
        this.cdr.detectChanges(); // Forcer la mise à jour
      });
    }
    
    this.dialog.open(NotificationDetailsComponent, {
      width: '500px',
      data: {
        title: this.formatType(notification.type),
        message: notification.message,
        date: notification.timestamp,
        read: true,
      }
    });
  }

  private formatType(type: string): string {
    return type.toLowerCase().replace(/_/g, ' ');
  }
}