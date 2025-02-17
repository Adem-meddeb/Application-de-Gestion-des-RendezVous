import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from '../Doctor/doctor.service';
import { Doctor, ScheduleEntry, Schedule } from '../doctor.model';
import * as L from 'leaflet';


@Component({
  selector: 'app-profile',

  standalone: false,

  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  // Ajouter ces propriétés
  languages = ['Français', 'Arabe', 'Anglais', 'Allemand', 'Espagnol'];
  paymentMethods = ['Espèces', 'Carte bancaire', 'Chèque', 'Assurance'];
  consultationDurations = [15, 30, 45, 60];
  sessionTypes = ['Séance unique', 'Double séance', 'Fermé'];
  governorates = [
    'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès',
    'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'Kébili',
    'Kef', 'Mahdia', 'Manouba', 'Médenine', 'Monastir',
    'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse',
    'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
  ];
  specializations = [
    {
      name: 'Médecine Générale',
      aptitude: 'Diagnostic et traitement des pathologies courantes'
    },
    {
      name: 'Gynécologie-Obstétrique',
      aptitude: 'Prise en charge de la santé reproductive féminine et suivi de grossesse'
    },
    {
      name: 'Cardiologie',
      aptitude: 'Prévention, diagnostic et traitement des maladies cardiovasculaires'
    },
    {
      name: 'Pédiatrie',
      aptitude: 'Suivi médical des enfants de la naissance à l\'adolescence'
    },
    {
      name: 'Orthopédie-Traumatologie',
      aptitude: 'Prise en charge des traumatismes et pathologies de l\'appareil locomoteur'
    },
    {
      name: 'Dermatologie',
      aptitude: 'Diagnostic et traitement des affections cutanées et maladies de la peau'
    },
    {
      name: 'Ophtalmologie',
      aptitude: 'Dépistage et traitement des troubles de la vision et pathologies oculaires'
    },
    {
      name: 'Otorhinolaryngologie (ORL)',
      aptitude: 'Prise en charge des pathologies de l\'oreille, du nez et de la gorge'
    },
    {
      name: 'Radiologie',
      aptitude: 'Interprétation d\'examens d\'imagerie médicale et radiologie interventionnelle'
    },
    {
      name: 'Chirurgie Générale',
      aptitude: 'Réalisation d\'interventions chirurgicales sur l\'abdomen et les tissus superficiels'
    },
    {
      name: 'Endocrinologie-Diabétologie',
      aptitude: 'Prise en charge des troubles hormonaux et du métabolisme glucidique'
    },
    {
      name: 'Neurologie',
      aptitude: 'Diagnostic et traitement des maladies du système nerveux central et périphérique'
    },
    {
      name: 'Psychiatrie',
      aptitude: 'Évaluation et traitement des troubles psychiatriques et de santé mentale'
    },
    {
      name: 'Gastro-entérologie',
      aptitude: 'Prise en charge des pathologies du tube digestif et des organes annexes'
    },
    {
      name: 'Urologie',
      aptitude: 'Diagnostic et traitement des affections de l\'appareil urinaire et génital masculin'
    },
    {
      name: 'Anesthésiologie-Réanimation',
      aptitude: 'Prise en charge périopératoire et médecine intensive'
    },
    {
      name: 'Rhumatologie',
      aptitude: 'Traitement des pathologies articulaires et des maladies auto-immunes'
    },
    {
      name: 'Oncologie Médicale',
      aptitude: 'Prise en charge globale des patients atteints de cancer'
    }
  ];
  selectedSpecialty: any;
  newSpecialty = '';
  geolocationError: string | null = null;
  editedDoctor!: Doctor;
  private map: L.Map | null = null;
  private marker: L.Marker | null = null;
  editMode = false;
  tempLatitude?: number;
  tempLongitude?: number;
  doctor!: Doctor; // Au lieu de doctor?: Doctor;
  days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.loadDoctorProfile();
  }

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

  getDaySchedule(day: string): ScheduleEntry | null {
    if (!this.editedDoctor?.schedule) return null;
    return this.editedDoctor.schedule[day.toLowerCase()] || null;
  }

  getGenderDisplay(gender: 'male' | 'female' | undefined): string {
    return gender === 'male' ? 'Masculin' : gender === 'female' ? 'Féminin' : 'Non spécifié';
  }

  enableGlobalEdit() {
    this.editMode = true;

    this.editedDoctor = {
      personalInfo: {
        firstName: this.doctor.personalInfo?.firstName || '',
        lastName: this.doctor.personalInfo?.lastName || '',
        cin: this.doctor.personalInfo?.cin || '',
        gender: this.doctor.personalInfo?.gender || 'male',
        age: this.doctor.personalInfo?.age || 0,
        phone: this.doctor.personalInfo?.phone || '',
        address: this.doctor.personalInfo?.address || '',
        email: this.doctor.personalInfo?.email || '',
        profilePhoto: this.doctor.personalInfo?.profilePhoto
      },
      education: {
        degrees: [...(this.doctor.education?.degrees || [])],
        specialties: [...(this.doctor.education?.specialties || [])] // Initialiser explicitement
      },
      experience: {
        positions: this.doctor.experience?.positions || [], // Garantir un tableau
        certification: this.doctor.experience?.certification
          ? { ...this.doctor.experience.certification }
          : undefined
      },
      cabinet: {
        address: this.doctor.cabinet?.address || '',
        governorate: this.doctor.cabinet?.governorate || '',
        latitude: this.doctor.cabinet?.latitude || 0,
        longitude: this.doctor.cabinet?.longitude || 0
      },
      practiceInfo: {
        languages: [...this.doctor.practiceInfo?.languages || []],
        paymentMethods: [...this.doctor.practiceInfo?.paymentMethods || []],
        consultationDuration: this.doctor.practiceInfo?.consultationDuration || 30
      },
      schedule: this.cloneSchedule(this.doctor.schedule)
    };
  }

  private cloneSchedule(schedule?: Schedule): Schedule {
    if (!schedule) return {} as Schedule;

    const cloned: Schedule = {};
    for (const day of this.days.map(d => d.toLowerCase())) {
      cloned[day] = {
        sessionType: schedule[day]?.sessionType || 'Fermé',
        times: { ...schedule[day]?.times }
      };
    }
    return cloned;
  }

  async saveAllEdits() {
    try {
      // Validation des horaires
      let scheduleValid = true;
      this.days.forEach(day => {
        const schedule = this.getDaySchedule(day.toLowerCase());
        if (schedule) {
          this.updateTimeValidation(day.toLowerCase(), schedule);
          if (this.geolocationError) scheduleValid = false;
        }
      });

      if (!scheduleValid) return;

      // Sauvegarde
      if (this.tempLatitude !== undefined && this.tempLongitude !== undefined) {
        this.editedDoctor.cabinet.latitude = this.tempLatitude;
        this.editedDoctor.cabinet.longitude = this.tempLongitude;
      }

      await this.doctorService.updateDoctor(this.editedDoctor).toPromise();
      this.loadDoctorProfile();
      this.editMode = false;
      this.tempLatitude = undefined;
      this.tempLongitude = undefined;
      this.geolocationError = null;
    } catch (error) {
      console.error('Erreur de sauvegarde', error);
    }
  }

  addDegree() {
    // Vérifier et initialiser la structure education si nécessaire
    if (!this.editedDoctor.education) {
      this.editedDoctor.education = {
        degrees: [],
        specialties: []
      };
    }

    // Vérifier et initialiser le tableau degrees
    if (!this.editedDoctor.education.degrees) {
      this.editedDoctor.education.degrees = [];
    }

    // Ajouter le nouveau diplôme
    this.editedDoctor.education.degrees.push({
      degreeName: '',
      institution: '',
      year: new Date().getFullYear()
    });
  }

  removeDegree(index: number) {
    // Vérification de l'existence de la structure education et degrees
    if (this.editedDoctor.education?.degrees) {
      this.editedDoctor.education.degrees.splice(index, 1);
    }
  }

  private loadDoctorProfile(): void {
    const doctor = this.doctorService.getCurrentDoctor();
    if (!doctor) {
      throw new Error('Médecin non initialisé');
    }
    this.doctor = doctor;
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

    this.editedDoctor = this.doctor;
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

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.doctorService.uploadProfilePhoto(file);
    }
  }
  
  addSpecialty() {
    if (this.selectedSpecialty) {
      if (!this.editedDoctor.education) {
        this.editedDoctor.education = {
          degrees: [],
          specialties: []
        };
      }

      this.editedDoctor.education.specialties.push({
        name: this.selectedSpecialty.name,
        aptitude: this.selectedSpecialty.aptitude
      });
      this.selectedSpecialty = null;
    }
  }

  removeSpecialty(specialty: { name: string; aptitude: string }) {
    if (this.editedDoctor.education?.specialties) {
      this.editedDoctor.education.specialties =
        this.editedDoctor.education.specialties.filter(s => s.name !== specialty.name);
    }
  }

  addPosition() {
    if (!this.editedDoctor.experience) {
      this.editedDoctor.experience = { positions: [] };
    }
    this.editedDoctor.experience.positions.push({
      position: '',
      hospital: '',
      duration: 0
    });
  }

  removePosition(index: number) {
    this.editedDoctor.experience?.positions?.splice(index, 1);
  }

  onCertificationUpload(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Initialiser experience si nécessaire
        if (!this.editedDoctor.experience) {
          this.editedDoctor.experience = { positions: [] };
        }

        // Mettre à jour la certification
        this.editedDoctor.experience.certification = {
          file: reader.result as string,
          fileName: file.name,
          fileSize: file.size
        };
      };
    }
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    // Vous pouvez ajouter une image de remplacement ici si nécessaire
  }

  get filteredSpecializations() {
    return this.specializations.filter(spec =>
      !this.editedDoctor.education?.specialties?.some(s => s.name === spec.name)
    );
  }

  isSpecialtyAdded(spec: any): boolean {
    return this.editedDoctor.education?.specialties?.some(s => s.name === spec.name) || false;
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.tempLatitude = position.coords.latitude;
          this.tempLongitude = position.coords.longitude;
          if (this.marker) {
            this.marker.setLatLng([this.tempLatitude, this.tempLongitude]);
            this.map?.panTo([this.tempLatitude, this.tempLongitude]);
          }
          this.geolocationError = null;
        },
        (error) => {
          this.handleGeolocationError(error);
        }
      );
    } else {
      this.geolocationError = 'La géolocalisation n\'est pas supportée par ce navigateur.';
    }
  }

  private handleGeolocationError(error: GeolocationPositionError) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        this.geolocationError = 'L\'utilisateur a refusé la demande de géolocalisation.';
        break;
      case error.POSITION_UNAVAILABLE:
        this.geolocationError = 'Les informations de localisation ne sont pas disponibles.';
        break;
      case error.TIMEOUT:
        this.geolocationError = 'La demande de localisation a expiré.';
        break;
      default:
        this.geolocationError = 'Une erreur inconnue est survenue.';
    }
  }

  updateTimeValidation(day: string, schedule: ScheduleEntry): void {
    if (!this.editMode) return;

    // Réinitialiser les erreurs
    const times = schedule.times;
    Object.keys(times).forEach(key => times[key as keyof typeof times] = times[key as keyof typeof times] || '');

    // Validation basique
    if (schedule.sessionType === 'Séance unique') {
      if (!times.singleStart || !times.singleEnd) {
        this.geolocationError = 'Les heures de séance sont requises';
      }
    } else if (schedule.sessionType === 'Double séance') {
      if (!times.firstStart || !times.firstEnd || !times.secondStart || !times.secondEnd) {
        this.geolocationError = 'Toutes les heures de séances sont requises';
      }
    }
  }
}