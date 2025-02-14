import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';

interface Message {
  id: number;
  senderName: string;
  senderEmail: string;
  content: string;
  date: Date;
  subject: string;
}

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  displayedColumns: string[] = ['senderName', 'senderEmail', 'subject', 'date'];
  dataSource: MatTableDataSource<Message>;

  messages: Message[] = [
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

  constructor(private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.messages);
  }

  openMessageDetail(message: Message): void {
    this.dialog.open(ContactDetailsComponent, {
      width: '600px',
      data: { message }
    });
  }
}
