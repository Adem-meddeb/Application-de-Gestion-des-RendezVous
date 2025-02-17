import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Appointment } from '../Models/appointment.model';
import { DatePipe } from '@angular/common';
import { PdfService } from '../Services/PDF/pdf.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../Services/SharedService/shared.service';

@Component({
  standalone: false,
  selector: 'app-medical-record',
  templateUrl: './medical-record.component.html',
  styleUrl: './medical-record.component.css',
  
})
export class MedicalRecordComponent implements OnInit {
  appointment!: Appointment;
  constructor(
    public dialogRef: MatDialogRef<MedicalRecordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Appointment,
    private datePipe: DatePipe,
    private pdfService: PdfService,// Ajoutez ceci

    private route: ActivatedRoute,
    private sharedService: SharedService,

  ) { }
  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.appointment = this.sharedService.getAppointmentById(id);
  }

  goBack(): void {
    window.history.back();
  }

  getFormattedBirthDate(): string {
    if (!this.data.patient.birthDate) return 'Date de naissance non spécifiée';
    return `Né(e) le ${this.datePipe.transform(this.data.patient.birthDate, 'dd/MM/yyyy')}`;
  }

  getFormattedConsultationDate(): string {
    return this.datePipe.transform(this.data.date, 'dd/MM/yyyy') || 'Date inconnue';
  }

  hasMedicalHistory(): boolean {
    // Vérification sécurisée avec coalescence nulle
    const medicalHistory = this.data.medicalHistory ?? {};
    return !!medicalHistory.diagnosis ||
      !!medicalHistory.treatment ||
      !!medicalHistory.notes;
  }

  getMedicalField(field: keyof NonNullable<Appointment['medicalHistory']>): string {
    return this.data.medicalHistory?.[field] || 'Non spécifié';
  }

  // Ajouter dans la classe component
  calculateAge(): number {
    if (!this.data.patient.birthDate) return 0;
    const birthDate = new Date(this.data.patient.birthDate);
    const diff = Date.now() - birthDate.getTime();
    return Math.abs(new Date(diff).getUTCFullYear() - 1970);
  }

  getStatusClass(): string {
    switch (this.data.status.toLowerCase()) {
      case 'confirmé':
        return 'confirmed';
      case 'en attente':
        return 'pending';
      case 'annulé':
        return 'cancelled';
      default:
        return '';
    }
  }


  // medical-record.component.ts
  async downloadPdf(): Promise<void> {
    try {
      await this.pdfService.generateMedicalRecordPdf(
        this.data,
        'assets/Logo.png' // Vérifier le chemin exact
      );
    } catch (error) {
      console.error('Détails de l\'erreur:', {
        error,
        appointment: this.data,
        logoPath: 'assets/Logo.png'
      });
      alert(`Erreur technique : ${(error as Error).message}`);
    }
  }
  
}