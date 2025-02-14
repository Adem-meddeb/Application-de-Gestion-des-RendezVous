import { Injectable } from '@angular/core';
import { Message } from '../contact.model'

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private messages: Message[] = [
    {
      id: 1,
      senderName: 'Jean Dupont',
      senderEmail: 'jean.dupont@example.com',
      content: 'Bonjour, je souhaite prendre rendez-vous...',
      date: new Date('2024-03-15'),
      subject: 'Demande de rendez-vous'
    },
    {
      id: 2,
      senderName: 'Marie Curie',
      senderEmail: 'marie.curie@example.com',
      content: 'Question concernant les résultats...',
      date: new Date('2024-03-16'),
      subject: 'Question médicale'
    }
  ];

  constructor() { }

  getMessages(): Message[] {
    return this.messages.map(msg => ({ ...msg }));
  }

  getMessageById(id: number): Message | undefined {
    const message = this.messages.find(msg => msg.id === id);
    return message ? { ...message } : undefined;
  }

  deleteMessage(id: number): void {
    this.messages = this.messages.filter(msg => msg.id !== id);
  }
}