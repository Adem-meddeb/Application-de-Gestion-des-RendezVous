import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  searchName = '';
  selectedSpecialty = '';
  selectedLocation = '';
  
  specialties = [
    'Cardiologie', 
    'Dermatologie', 
    'Pédiatrie', 
    'Gynécologie'
  ];
  
  locations = [
    'Tunis', 
    'Sfax', 
    'Sousse', 
    'Nabeul'
  ];

  doctors = [
    {
      name: 'Dr. Ali Ben Salah',
      specialty: 'Cardiologie',
      price: 60,
      location: 'Tunis',
      rating: 4,
      image: 'assets/doctor1.jpg'
    },
    // Ajouter plus de médecins...
  ];

  filteredDoctors = this.doctors;

  constructor() { }

  ngOnInit(): void {
  }

  searchDoctors(): void {
    this.filteredDoctors = this.doctors.filter(doctor => {
      const nameMatch = doctor.name.toLowerCase().includes(this.searchName.toLowerCase());
      const specialtyMatch = this.selectedSpecialty ? 
        doctor.specialty === this.selectedSpecialty : true;
      const locationMatch = this.selectedLocation ? 
        doctor.location === this.selectedLocation : true;
      
      return nameMatch && specialtyMatch && locationMatch;
    });
  }
}