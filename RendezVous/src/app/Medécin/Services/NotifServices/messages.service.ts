import { Injectable } from '@angular/core';
import { Message } from '../../Notifs/messages/messages.component';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private _messages: Message[] = [

    {
      id: 1,
      sender: 'Dr. Jean Dupont',
      subject: 'Demande de rendez-vous',
      content: 'Bonjour, je souhaiterais prendre rendez-vous pour une consultation...',
      timestamp: new Date('2024-03-15'),
      read: false
    },
    {
      id: 2,
      sender: 'Clinique Saint-Louis',
      subject: 'Rappel de vaccination',
      content: 'Nous vous rappelons que votre prochaine vaccination est prévue...',
      timestamp: new Date('2024-03-14'),
      read: true,
      attachments: ['document.pdf']
    },
    // Déplacer les messages ici
  ];

  get messages(): Message[] {
    return this._messages;
  }

  getMessage(id: number): Message | undefined {
    return this._messages.find(m => m.id === id);
  }

  deleteMessage(id: number): void {
    this._messages = this.messages.filter(m => m.id !== id);
  }

  markAllAsRead(): void {
    this._messages.forEach(m => m.read = true);
  }
}
