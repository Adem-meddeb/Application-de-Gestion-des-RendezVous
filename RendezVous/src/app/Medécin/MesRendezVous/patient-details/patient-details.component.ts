import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Patient {
  id: number;
  profilePhoto?: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email?: string;
  age?: number;
  // Ajouter d'autres champs selon les besoins
}

@Component({
  selector: 'app-patient-details',
  standalone: false,

  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent {

  constructor(
    public dialogRef: MatDialogRef<PatientDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public patient: Patient
  ) { }
}
