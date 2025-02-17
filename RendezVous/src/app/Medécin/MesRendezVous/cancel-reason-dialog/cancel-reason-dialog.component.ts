import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cancel-reason-dialog',
  standalone: false,
  
  template: `
    <h2 mat-dialog-title>Raison de l'annulation</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="w-100">
        <textarea matInput
                  [(ngModel)]="reason"
                  placeholder="Veuillez indiquer la raison de l'annulation..."
                  rows="3"></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Fermer</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="reason">Confirmer</button>
    </mat-dialog-actions>
  `,
  styleUrl: './cancel-reason-dialog.component.css'
})
export class CancelReasonDialogComponent {
  reason = '';

  constructor(
    public dialogRef: MatDialogRef<CancelReasonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
