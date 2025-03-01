import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileDoctorService } from '../Services/PorfileDoctorService/profile-doctor.service';
import { Doctor, Office, Education, Experience, Specialization } from '../Models/ProfileDoctor.model';
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
  doctor: Doctor = {
    id: 0,
    firstName: '',
    lastName: '',
    cin: '',
    gender: 'MALE',
    age: 0,
    phoneNumber: '',
    email: '',
    billingAddress: '',
    profilePhoto: '',
    aptitudeCertificate: '',
    education: [],
    experience: [],
    office: { 
      address: '', 
      governorate: '', 
      latitude: 0, 
      longitude: 0 
    },
    specializations: [],
    languages: [],
    paymentMethods: [],
    consultationDuration: 30
  };
  days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  constructor(private doctorService: ProfileDoctorService) { }

  ngOnInit(): void {
    this.loadDoctorProfile();
  }

  ngAfterViewInit(): void {
    this.loadDoctorProfile();
    // Délai pour la stabilisation du DOM
    setTimeout(() => {
      if (this.doctor?.office?.latitude && this.doctor?.office?.longitude) {
        this.initMap(false);
      }
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  


  getGenderDisplay(gender: 'MALE' | 'FEMALE' | undefined): string {
    return gender === 'MALE' ? 'Masculin' :
      gender === 'FEMALE' ? 'Féminin' :
        'Non spécifié';
  }

  enableGlobalEdit() {
    this.editMode = true;

    this.editedDoctor = {
      id: this.doctor.id,
      firstName: this.doctor.firstName || '',
      lastName: this.doctor.lastName || '',
      cin: this.doctor.cin || '',
      gender: this.doctor.gender || 'MALE',
      age: this.doctor.age || 0,
      phoneNumber: this.doctor.phoneNumber || '',
      email: this.doctor.email || '',
      billingAddress: this.doctor.billingAddress || '',
      profilePhoto: this.doctor.profilePhoto,
      aptitudeCertificate: this.doctor.aptitudeCertificate,
      education: [...this.doctor.education],
      experience: [...this.doctor.experience],
      office: { ...this.doctor.office },
      specializations: [...this.doctor.specializations],
      languages: [...this.doctor.languages || []],
      paymentMethods: [...this.doctor.paymentMethods || []],
      consultationDuration: this.doctor.consultationDuration || 30 // Valeur par défaut
    };
  }


  addDegree() {
    // Initialiser le tableau education si nécessaire
    if (!this.editedDoctor.education) {
      this.editedDoctor.education = [];
    }

    // Ajouter un nouvel objet Education
    this.editedDoctor.education.push({
      degreeName: '',
      institution: '',
      year: new Date().getFullYear()
    });
  }

  removeDegree(index: number) {
    // Utiliser directement le tableau education
    if (this.editedDoctor.education) {
      this.editedDoctor.education.splice(index, 1);
    }
  }

  private loadDoctorProfile(): void {
    this.doctorService.getCurrentDoctor().subscribe({
      next: (doctor) => {
        this.doctor = doctor;
        if (this.doctor?.office?.latitude && this.doctor?.office?.longitude) {
          this.initMap(false); // Appeler initMap avec le paramètre
        }
      },
      error: (err) => console.error('Erreur de chargement', err)
    });
  }

  private initMap(editable = false): void {
    const mapId = editable ? 'editMap' : 'viewMap';

    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    const lat = this.tempLatitude || this.doctor?.office?.latitude;
    const lng = this.tempLongitude || this.doctor?.office?.longitude;

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
      .bindPopup(this.doctor?.office?.address || 'Localisation du cabinet')
      .openPopup();
  }

  enableEditMode(): void {
    this.editMode = true;
    this.tempLatitude = this.doctor?.office?.latitude;
    this.tempLongitude = this.doctor?.office?.longitude;

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
    if (this.tempLatitude && this.tempLongitude && this.doctor?.office && this.doctor.id) {
      this.doctor.office.latitude = this.tempLatitude;
      this.doctor.office.longitude = this.tempLongitude;

      this.doctorService.updateCabinetInfo(this.doctor.id, this.doctor.office).subscribe({
        next: () => {
          this.editMode = false;
          this.initMap(false);
        },
        error: (err) => console.error('Erreur de sauvegarde:', err)
      });
    }
  }

  onFileSelected(event: any, type: 'profile' | 'aptitude'): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file && this.doctor?.id) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      if (type === 'profile') {
        this.doctorService.uploadProfilePhoto(this.doctor.id, formData).subscribe({
          next: (updatedDoctor) => {
            this.doctor = updatedDoctor;
            if (this.editMode) this.editedDoctor.profilePhoto = updatedDoctor.profilePhoto;
          },
          error: (err) => console.error('Erreur upload photo', err)
        });
      } else {
        this.doctorService.uploadAptitudeCertificate(this.doctor.id, formData).subscribe({
          next: (updatedDoctor) => {
            this.doctor = updatedDoctor;
            if (this.editMode) this.editedDoctor.aptitudeCertificate = updatedDoctor.aptitudeCertificate;
          },
          error: (err) => console.error('Erreur upload certificat', err)
        });
      }
    }
  }

  addSpecialization() {
    if (this.selectedSpecialty) {
      // Initialiser le tableau specializations si nécessaire
      if (!this.editedDoctor.specializations) {
        this.editedDoctor.specializations = [];
      }

      // Ajouter la nouvelle spécialisation
      this.editedDoctor.specializations.push({
        id: this.selectedSpecialty.id, // Supposant que votre modèle a un ID
        name: this.selectedSpecialty.name
      });

      this.selectedSpecialty = null;
    }
  }

  removeSpecialization(specializationId: number) {
    if (this.editedDoctor.specializations) {
      this.editedDoctor.specializations =
        this.editedDoctor.specializations.filter(s => s.id !== specializationId);
    }
  }

  addExperience() {
    // Initialiser le tableau experience si nécessaire
    if (!this.editedDoctor.experience) {
      this.editedDoctor.experience = [];
    }

    // Ajouter une nouvelle expérience
    this.editedDoctor.experience.push({
      position: '',
      hospital: '',
      duration: 0
    });
  }

  removeExperience(index: number) {
    if (this.editedDoctor.experience) {
      this.editedDoctor.experience.splice(index, 1);
    }
  }

  onCertificationUpload(event: any, type: 'profile' | 'aptitude') {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file && this.doctor?.id) {
      const field = type === 'profile' ? 'profilePhoto' : 'aptitudeCertificate';

      this.handleFileUpload(file, field)
        .then(() => {
          const formData = new FormData();
          formData.append('file', file, file.name);

          if (type === 'profile') {
            this.doctorService.uploadProfilePhoto(this.doctor.id, formData).subscribe({
              next: (updatedDoctor) => {
                this.doctor = updatedDoctor;
                if (this.editMode) this.editedDoctor.profilePhoto = updatedDoctor.profilePhoto;
              },
              error: (err) => console.error('Erreur upload photo', err)
            });
          } else {
            this.doctorService.uploadAptitudeCertificate(this.doctor.id, formData).subscribe({
              next: (updatedDoctor) => {
                this.doctor = updatedDoctor;
                if (this.editMode) this.editedDoctor.aptitudeCertificate = updatedDoctor.aptitudeCertificate;
              },
              error: (err) => console.error('Erreur upload certificat', err)
            });
          }
        })
        .catch(error => console.error(error));
    }
  }

  handleFileUpload(file: File, field: 'profilePhoto' | 'aptitudeCertificate'): Promise<void> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (!reader.result) {
          reject(new Error('Échec de la lecture du fichier'));
          return;
        }

        if (typeof reader.result === 'string') {
          const base64 = reader.result.split(',')[1];
          this.editedDoctor[field] = base64;
          resolve();
        } else {
          reject(new Error('Format de fichier non supporté'));
        }
      };

      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    // Vous pouvez ajouter une image de remplacement ici si nécessaire
  }

  get filteredSpecializations() {
    return this.specializations.filter(spec =>
      !this.editedDoctor.specializations?.some((s: Specialization) => s.name === spec.name)
    );
  }

  isSpecialtyAdded(spec: any): boolean {
    return this.editedDoctor.specializations?.some((s: Specialization) => s.name === spec.name) || false;
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

  saveAllEdits() {
    if (this.editedDoctor && this.doctor?.id) {
      this.doctorService.updateDoctor(this.doctor.id, this.editedDoctor)
        .subscribe({
          next: (updatedDoctor) => {
            this.doctor = updatedDoctor;
            this.editMode = false;
            this.initMap(false); // Recharger la carte si nécessaire
            // Ajouter un feedback utilisateur si besoin
            console.log('Modifications sauvegardées avec succès');
          },
          error: (err) => {
            console.error('Erreur lors de la sauvegarde', err);
            // Ajouter une gestion d'erreur utilisateur
          }
        });
    }
  }
  get isGeolocationSupported(): boolean {
    return !!navigator.geolocation;
  }

}