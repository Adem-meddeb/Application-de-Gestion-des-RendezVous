import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message, MessagesComponent } from '../messages/messages.component';
import { MessagesService } from '../../Services/NotifServices/messages.service';

@Component({
  selector: 'app-message-detail',
  providers: [MessagesService],
  standalone: false,

  template: `
    <div class="message-detail-container">
      <button mat-button (click)="goBack()">
        <mat-icon>arrow_back</mat-icon>
        Retour
      </button>
      
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ message?.subject }}</mat-card-title>
          <mat-card-subtitle>
            De : {{ message?.sender }}
            <span class="timestamp">{{ message?.timestamp | date:'dd/MM/yyyy HH:mm' }}</span>
          </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <p>{{ message?.content }}</p>
          
          <<div *ngIf="message?.attachments as attachments" class="attachments">
  <h4>Pièces jointes :</h4>
  <div *ngFor="let file of attachments" class="file">
              <mat-icon>insert_drive_file</mat-icon>
              {{ file }}
              <button mat-icon-button>
                <mat-icon>download</mat-icon>
              </button>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .message-detail-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 1rem;
    }

    .timestamp {
      margin-left: 1rem;
      color: #666;
    }

    .attachments {
      margin-top: 2rem;
      padding: 1rem;
      background: #f5f5f5;
      border-radius: 8px;

      h4 {
        color: #2a627c;
        margin-bottom: 1rem;
      }

      .file {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        background: white;
        border-radius: 4px;
        margin-bottom: 8px;
      }
    }

    mat-card-content p {
      white-space: pre-wrap;
      line-height: 1.6;
      font-size: 16px;
    }
  `]
})
export class MessageDetailComponent {

  message?: Message;

  constructor(
    private route: ActivatedRoute,
    
    private messagesService: MessagesComponent // À remplacer par un vrai service
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.message = this.messagesService.messages.find(m => m.id === +id);
  }

  goBack(): void {
    window.history.back();
  }

}
