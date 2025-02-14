import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact-details',
  standalone: false,
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'
})
export class ContactDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<ContactDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: any }
  ) {}
}
