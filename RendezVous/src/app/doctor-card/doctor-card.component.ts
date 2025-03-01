import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-doctor-card',
  standalone: false,
  
  templateUrl: './doctor-card.component.html',
  styleUrl: './doctor-card.component.css'
})
export class DoctorCardComponent {
  @Input() doctor: any;

  bookAppointment() {
    // Logique de prise de rendez-vous
  }

}