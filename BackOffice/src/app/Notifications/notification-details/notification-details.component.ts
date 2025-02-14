import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notification-details',
  standalone: false,
  templateUrl: './notification-details.component.html',
  styleUrl: './notification-details.component.css'
})
export class NotificationDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public notification: any) { }
}
