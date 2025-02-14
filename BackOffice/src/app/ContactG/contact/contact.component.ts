import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ContactDetailsComponent } from '../contact-details/contact-details.component';
import { ContactService } from '../Services/contact.service';

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

  constructor(
    private dialog: MatDialog,
    private contactService: ContactService
  ) {
    this.dataSource = new MatTableDataSource(this.contactService.getMessages());
  }

  openMessageDetail(message: Message): void {
    const fullMessage = this.contactService.getMessageById(message.id);
    if (fullMessage) {
      this.dialog.open(ContactDetailsComponent, {
        width: '600px',
        data: { message: fullMessage }
      });
    }
  }

  deleteMessage(id: number): void {
    this.contactService.deleteMessage(id);
    this.dataSource.data = this.contactService.getMessages();
  }
}