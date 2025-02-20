import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { Client } from '@stomp/stompjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface AppNotification {
  id: number;
  message: string;
  type: string;
  read: boolean; // Doit correspondre au type boolean
  timestamp: Date; // Utiliser Date au lieu de string
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private stompClient: Client;
  private notificationsSubject = new BehaviorSubject<AppNotification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();
  private apiUrl = 'http://localhost:8081/api/notifications';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8081/ws',
      connectHeaders: { Authorization: `Bearer ${token}` },
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
    });
  }

  connect(user: any): void {
    this.loadInitialNotifications(user);

    this.stompClient.onConnect = (frame) => {
      const destination = user.role === 'ROLE_ADMIN'
        ? '/topic/admin-notifications'
        : `/user/${user.id}/notifications`;

        this.stompClient.subscribe(destination, (message) => {
          try {
            const raw = JSON.parse(message.body);
            console.log('Reçu:', raw); // Debug
            const updatedNotification = this.parseNotification(raw);
            
            const current = this.notificationsSubject.value;
            const index = current.findIndex(n => n.id === updatedNotification.id);
            
            if (index > -1) {
              const newNotifications = [...current];
              newNotifications[index] = updatedNotification;
              this.notificationsSubject.next(newNotifications);
            } else {
              this.notificationsSubject.next([updatedNotification, ...current]);
            }
          } catch (e) {
            console.error('Erreur de parsing WebSocket:', e);
          }
        });
    };

    this.stompClient.onStompError = (frame) => {
      // Correction ici : utilisation de la notation bracket pour accéder à la propriété message
      const errorMessage = frame.headers?.['message'] || 'Unknown WebSocket error';
      console.error('WebSocket Error:', errorMessage);
    };

    this.stompClient.activate();
  }

  private parseNotification(raw: any): AppNotification {
    return {
      ...raw,
      timestamp: new Date(raw.timestamp),
      read: Number(raw.read) === 1 // Conversion explicite en number puis comparaison
    };
  }


  // notification.service.ts
private loadInitialNotifications(user: any): void {
  if (!user) return;

  const url = user.role === 'ROLE_ADMIN' 
    ? `${this.apiUrl}/admin`
    : `${this.apiUrl}/${user.id}`;

  this.http.get<any[]>(url).pipe(
    tap(notifications => {
      console.log('Réponse initiale:', notifications); // Vérifier les valeurs de 'read'
      const parsed = notifications.map(n => this.parseNotification(n));
      this.notificationsSubject.next(parsed.reverse());
    })
  ).subscribe();
}

  private fetchInitialNotifications(userId: number): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(
      `http://localhost:8081/api/notifications/admin`, // Ajouter l'URL complète du backend
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      }
    );
  }

  private setupWebSocket(userId: number): void {
    this.stompClient.onConnect = (frame) => {
      this.stompClient.subscribe(`/topic/admin/${userId}`, (message) => {
        const notification: AppNotification = JSON.parse(message.body);
        this.addNotification(notification);
      });
    };

    this.stompClient.activate();
  }

  private addNotification(notification: AppNotification): void {
    const current = this.notificationsSubject.value;
    this.notificationsSubject.next([notification, ...current]);
  }

  markAsRead(id: number): Observable<AppNotification> {
    return this.http.put<AppNotification>(`${this.apiUrl}/${id}/read`, {}).pipe(
      tap((updatedNotification) => {
        const parsed = this.parseNotification(updatedNotification);
        const current = this.notificationsSubject.value;
        const index = current.findIndex(n => n.id === parsed.id);
        
        if (index > -1) {
          const newNotifications = [...current];
          newNotifications[index] = parsed;
          this.notificationsSubject.next(newNotifications);
        }
      }),
      catchError(error => {
        console.error('Échec de la mise à jour', error);
        return throwError(() => error); // Utiliser throwError au lieu de of(null)
      })
    );
  }

  disconnect(): void {
    if (this.stompClient.active) {
      this.stompClient.deactivate();
    }
    this.notificationsSubject.next([]);
  }
}