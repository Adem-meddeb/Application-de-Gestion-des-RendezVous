import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../Services/Doctor/doctor.service';
import { Doctor, ScheduleEntry } from '../Models/doctor.model';
import * as L from 'leaflet';


@Component({
  selector: 'app-profile',
  
  standalone: false,
  
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  private map: L.Map | null = null;
  private marker: L.Marker | null = null;
  editMode = false;
  tempLatitude?: number;
  tempLongitude?: number;
  doctor?: Doctor;
  days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  constructor(private doctorService: DoctorService) { }

  ngAfterViewInit(): void {
    this.loadDoctorProfile();
    // Délai pour la stabilisation du DOM
    setTimeout(() => {
      if (this.doctor?.cabinet?.latitude && this.doctor?.cabinet?.longitude) {
        this.initMap(false);
      }
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  ngOnInit(): void {
    this.loadDoctorProfile();
  }

  private loadDoctorProfile(): void {
    this.doctor = this.doctorService.getCurrentDoctor();
  }

  private initMap(editable = false): void {
    const mapId = editable ? 'editMap' : 'viewMap';
    
    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    const lat = this.tempLatitude || this.doctor?.cabinet?.latitude;
    const lng = this.tempLongitude || this.doctor?.cabinet?.longitude;

    if (!lat || !lng) return;

    this.map = L.map(mapId, {
      attributionControl: false,
      zoomControl: true
    }).setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      detectRetina: true
    }).addTo(this.map);

    if (editable) {
      this.setupEditableMap(lat, lng);
    } else {
      this.setupViewMap(lat, lng);
    }
  }

  private setupEditableMap(lat: number, lng: number): void {
    if (!this.map) return;

    // Création d'un marker draggable
    this.marker = L.marker([lat, lng], { 
      draggable: true,
      autoPan: true
    }).addTo(this.map);

    // Gestion du déplacement du marker
    this.marker.on('dragend', (event) => {
      const position = event.target.getLatLng();
      this.tempLatitude = position.lat;
      this.tempLongitude = position.lng;
    });

    // Gestion des clics sur la carte
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.tempLatitude = e.latlng.lat;
      this.tempLongitude = e.latlng.lng;
      if (this.marker) {
        this.marker.setLatLng(e.latlng);
        this.map?.panTo(e.latlng);
      }
    });
  }

  private setupViewMap(lat: number, lng: number): void {
    if (!this.map) return;

    // Création d'un marker fixe
    L.marker([lat, lng], {
      icon: L.icon({
        iconUrl: 'assets/marker-icon.png',
        iconRetinaUrl: 'assets/marker-icon-2x.png',
        shadowUrl: 'assets/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
      })
    })
    .addTo(this.map)
    .bindPopup(this.doctor?.cabinet?.address || 'Localisation du cabinet')
    .openPopup();
  }

  enableEditMode(): void {
    this.editMode = true;
    this.tempLatitude = this.doctor?.cabinet?.latitude;
    this.tempLongitude = this.doctor?.cabinet?.longitude;
    
    setTimeout(() => {
      this.initMap(true);
    }, 150);
  }

  cancelEdit(): void {
    this.editMode = false;
    this.tempLatitude = undefined;
    this.tempLongitude = undefined;
    this.initMap(false);
  }

  saveLocation(): void {
    if (this.tempLatitude && this.tempLongitude && this.doctor?.cabinet) {
      this.doctor.cabinet.latitude = this.tempLatitude;
      this.doctor.cabinet.longitude = this.tempLongitude;
      
      this.doctorService.updateCabinetInfo(this.doctor.cabinet).subscribe({
        next: () => {
          this.editMode = false;
          this.initMap(false);
        },
        error: (err) => console.error('Erreur de sauvegarde:', err)
      });
    }
  }

  // Autres méthodes existantes
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.doctorService.uploadProfilePhoto(file);
    }
  }

  getDaySchedule(day: string): ScheduleEntry | null {
    if (!this.doctor?.schedule) return null;
    const dayKey = day.toLowerCase();
    return this.doctor.schedule[dayKey] ?? null;
  }

  getGenderDisplay(gender: 'male' | 'female' | undefined): string {
    return gender === 'male' ? 'Masculin' : gender === 'female' ? 'Féminin' : 'Non spécifié';
  }
}