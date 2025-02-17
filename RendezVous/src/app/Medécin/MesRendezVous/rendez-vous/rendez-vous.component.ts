import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { MatDialog } from '@angular/material/dialog';
import { Appointment , Patient } from '../../Models/appointment.model';
import { SharedService } from '../../Services/SharedService/shared.service';
import { CancelReasonDialogComponent } from '../cancel-reason-dialog/cancel-reason-dialog.component';
import { MedicalRecordComponent } from '../../medical-record/medical-record.component';

@Component({
  selector: 'app-rendez-vous',
  standalone: false,
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent {
  currentRoute: string;
  appointments: Appointment[] = [];
  upcomingAppointments: Appointment[] = [];
  pastAppointments: Appointment[] = [];
  selectedTab: 'upcoming' | 'past' = 'upcoming';

  // Configuration des filtres et tris
  upcomingFilters = {
    searchTerm: '',
    status: 'all',
    date: ''
  };

  upcomingSort = {
    by: 'date' as 'date' | 'patient',
    direction: 'asc' as 'asc' | 'desc'
  };

  pastFilters = {
    searchTerm: '',
    date: ''
  };

  pastSort = {
    by: 'date' as 'date' | 'patient',
    direction: 'asc' as 'asc' | 'desc'
  };

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private sharedService: SharedService
  ) {
    this.currentRoute = this.router.url;
    this.loadAppointments();
  }

  private loadAppointments() {
    // Récupération depuis le service
    this.appointments = this.sharedService.getAppointments();

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Filtrage des rendez-vous
    this.upcomingAppointments = this.appointments.filter(a => 
      new Date(a.date) >= today
    );
    
    this.pastAppointments = this.appointments.filter(a => 
      new Date(a.date) < today
    );
  }

  // Getters pour les données filtrées et triées
  get filteredUpcomingAppointments(): Appointment[] {
    return this.upcomingAppointments
      .filter(appointment => {
        const searchMatch = this.upcomingFilters.searchTerm.toLowerCase() === '' ||
          `${appointment.patient.firstName} ${appointment.patient.lastName}`
            .toLowerCase().includes(this.upcomingFilters.searchTerm.toLowerCase());
        
        const statusMatch = this.upcomingFilters.status === 'all' ||
          appointment.status === this.upcomingFilters.status;

        const dateMatch = !this.upcomingFilters.date || 
          appointment.date === this.upcomingFilters.date;

        return searchMatch && statusMatch && dateMatch;
      })
      .sort((a, b) => this.sortAppointments(a, b, this.upcomingSort));
  }

  get filteredPastAppointments(): Appointment[] {
    return this.pastAppointments
      .filter(appointment => {
        const searchMatch = this.pastFilters.searchTerm.toLowerCase() === '' ||
          `${appointment.patient.firstName} ${appointment.patient.lastName}`
            .toLowerCase().includes(this.pastFilters.searchTerm.toLowerCase());

        const dateMatch = !this.pastFilters.date || 
          appointment.date === this.pastFilters.date;

        return searchMatch && dateMatch;
      })
      .sort((a, b) => this.sortAppointments(a, b, this.pastSort));
  }

  private sortAppointments(a: Appointment, b: Appointment, config: any): number {
    const modifier = config.direction === 'asc' ? 1 : -1;
    
    if (config.by === 'date') {
      const dateA = new Date(`${a.date}T${a.time}`).getTime();
      const dateB = new Date(`${b.date}T${b.time}`).getTime();
      return (dateA - dateB) * modifier;
    }
    
    if (config.by === 'patient') {
      const nameA = `${a.patient.lastName} ${a.patient.firstName}`.toLowerCase();
      const nameB = `${b.patient.lastName} ${b.patient.firstName}`.toLowerCase();
      return nameA.localeCompare(nameB) * modifier;
    }

    return 0;
  }

  get hasUpcomingAppointments(): boolean {
    return this.upcomingAppointments.length > 0;
  }

  get hasPastAppointments(): boolean {
    return this.pastAppointments.length > 0;
  }

  openPatientDetails(patient: Patient): void {
    this.dialog.open(PatientDetailsComponent, {
      width: '600px',
      data: patient
    });
  }

  cancelAppointment(appointment: Appointment, reason: string): void {
    const index = this.appointments.findIndex(a => a.id === appointment.id);
    if (index > -1) {
      this.appointments[index].status = 'Annulé';
      this.appointments[index].cancellationReason = reason;
      this.sharedService.setAppointments(this.appointments);
      this.loadAppointments();
      alert('Rendez-vous annulé avec succès');
    }
  }

  // Ajoutez ces méthodes
confirmAppointment(appointment: Appointment): void {
  const index = this.appointments.findIndex(a => a.id === appointment.id);
  if (index > -1) {
    this.appointments[index].status = 'Confirmé';
    this.sharedService.setAppointments(this.appointments);
    this.loadAppointments();
    alert('Rendez-vous confirmé avec succès');
  }
}

openCancelDialog(appointment: Appointment): void {
  const dialogRef = this.dialog.open(CancelReasonDialogComponent, {
    width: '500px',
    data: { reason: appointment.cancellationReason || '' }
  });

  dialogRef.afterClosed().subscribe(reason => {
    if (reason) {
      this.cancelAppointment(appointment, reason);
    }
  });
}

openMedicalRecord(appointment: Appointment): void {
  this.dialog.open(MedicalRecordComponent, {
    data: appointment,
    width: '1000px',
  });
}
} 