// shared.service.ts
import { Injectable } from '@angular/core';
import { Appointment , Patient } from '../../Models/appointment.model';
import { MatDialog } from '@angular/material/dialog';
import { PatientDetailsComponent } from '../../MesRendezVous/patient-details/patient-details.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private appointments: Appointment[] = [

    {
      id: 1,
      patient: {
        id: 1,
        firstName: 'Mohamed',
        lastName: 'Ali',
        address: '12 Rue de la République, Tunis',
        phone: '12345678',
        profilePhoto: 'assets/doc1.jpg',
        age: 35
      },
      date: '2024-03-20',
      time: '10:00',
      type: 'Consultation générale',
      status: 'Confirmé'
    },
    {
      id: 2,
      patient: {
        id: 2,
        firstName: 'Fatima',
        lastName: 'Zahra',
        address: '45 Avenue Habib Bourguiba',
        phone: '98765432',
        profilePhoto: 'assets/doc1.jpg',
        age: 28
      },
      date: '2023-12-15',
      time: '14:30',
      type: 'Suivi post-opératoire',
      status: 'Terminé'
    },
    {
      id: 3,
      patient: {
        id: 3,
        firstName: 'Karim',
        lastName: 'Ben Ahmed',
        address: 'Rue du Commerce',
        phone: '55667788',
        profilePhoto: 'assets/doc1.jpg',
        age: 42
      },
      date: '2025-02-10',
      time: '11:15',
      type: 'Vaccination',
      status: 'En attente'
    },
    {
      id: 4,
      patient: {
        id: 4,
        firstName: 'Leila',
        lastName: 'Smith',
        address: 'Avenue Mohamed V',
        phone: '11223344',
        profilePhoto: 'assets/doc1.jpg',
        age: 31
      },
      date: '2026-04-05',
      time: '09:00',
      type: 'Consultation cardiologie',
      status: 'En attente'
    }

  ];

  constructor(private dialog: MatDialog) {}
  
  setAppointments(appointments: Appointment[]) {
    this.appointments = appointments;
  }

  getAppointments(): Appointment[] {
    return this.appointments;
  }

  // Ajouter cette méthode
  openPatientDetails(patient: Patient): void {
    this.dialog.open(PatientDetailsComponent, {
      width: '600px',
      data: patient
    });
  }
}