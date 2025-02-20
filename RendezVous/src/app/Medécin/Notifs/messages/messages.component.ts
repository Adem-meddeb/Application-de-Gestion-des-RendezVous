import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from '../../Services/NotifServices/messages.service';

export interface Message {
  id: number;
  sender: string;
  subject: string;
  content: string;
  timestamp: Date;
  read: boolean;
  attachments?: string[];
}

@Component({
  selector: 'app-messages',
  standalone: false,
  
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
 

  constructor(
    private router: Router,
    public messagesService: MessagesService // Injection du service
  ) {}

  get unreadCount(): number {
    return this.messages.filter(m => !m.read).length;
  }

  get messages() {
    return this.messagesService.messages;
  }

  toggleRead(message: Message): void {
    message.read = !message.read;
  }

  deleteMessage(id: number): void {
    this.messagesService.deleteMessage(id);
  }
  markAllAsRead(): void {
    this.messages.forEach(m => m.read = true);
  }
  openMessage(messageId: number): void {
    this.router.navigate(['/messages', messageId]);
    // Marquer comme lu automatiquement
    const message = this.messages.find(m => m.id === messageId);
    if (message && !message.read) {
      message.read = true;
    }
  }
}