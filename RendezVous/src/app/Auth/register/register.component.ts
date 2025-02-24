import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange } from '@angular/material/select';
import L from 'leaflet';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/*-----------------------------------------------------
  Interfaces
-----------------------------------------------------*/
interface DayScheduleGroup {
  enabled: boolean;
  startTime: string;
  endTime: string;
}

interface ProfilePhoto {
  file: File | null;
  fileName: string;
  fileSize: number;
  preview: string | ArrayBuffer | null;
}

/*-----------------------------------------------------
  Component Declaration
-----------------------------------------------------*/
@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {

  /*-----------------------------------------------------
    Propriétés et Variables
  -----------------------------------------------------*/
  // Propriétés de la section « Pratique »
  showScrollButton = false;

  languages: string[] = []; // Remplace le tableau statique
  paymentMethods = ['Espèces', 'Carte bancaire', 'Chèque', 'Assurance'];
  consultationDurations = [15, 30, 45, 60];
  sessionTypes = ['Séance unique', 'Double séance', 'Fermé'];

  // Propriétés pour l'intégration de la carte (Leaflet)
  private map!: L.Map;
  private marker?: L.Marker;

  // Formulaire et autres propriétés
  registrationForm: FormGroup;
  selectedLanguage = 'fr';
  specializations = [
    'Médecine Générale',
    'Gynécologie-Obstétrique',
    'Cardiologie',
    'Pédiatrie',
    'Orthopédie-Traumatologie',
    'Dermatologie',
    'Ophtalmologie',
    'Otorhinolaryngologie (ORL)',
    'Radiologie',
    'Chirurgie Générale',
    'Endocrinologie-Diabétologie',
    'Neurologie',
    'Psychiatrie',
    'Gastro-entérologie',
    'Urologie'
  ];
  governorates = [
    'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès',
    'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'Kébili',
    'Kef', 'Mahdia', 'Manouba', 'Médenine', 'Monastir',
    'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse',
    'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
  ];
  days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  submitted = false;
  genders = ['male', 'female'];
  profilePhotoPreview: string | ArrayBuffer | null = null;
  showPassword = false;
  showConfirmPassword = false;
  geolocationError = '';
  certificationPreview: string | ArrayBuffer | null = null;

  /*-----------------------------------------------------
    Constructeur
  -----------------------------------------------------*/
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient // Ajout de HttpClient

  ) {
    // Initialisation du formulaire avec des groupes imbriqués
    this.registrationForm = this.fb.group({
      personalInfo: this.fb.group({
        firstName: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s]*$')]],
        lastName: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s]*$')]],
        cin: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        gender: ['', Validators.required],
        age: ['', [Validators.required, Validators.min(23), Validators.max(100)]],
        phone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        address: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
      }, { validators: this.passwordMatchValidator }),

      profilePhoto: this.fb.group({
        file: [null, [Validators.required, this.fileTypeValidator(['image/jpeg', 'image/png']), this.fileSizeValidator(4096)]],
        fileName: [''],
        fileSize: [0],
        preview: ['']
      }),

      education: this.fb.group({
        degrees: this.fb.array([this.createDegree()], Validators.required),
        specialties: this.fb.array([this.fb.control('')])
      }),

      experience: this.fb.group({
        positions: this.fb.array([this.createPosition()]),
        certification: this.fb.group({
          file: [null, [Validators.required, this.fileTypeValidator(['image/jpeg', 'image/png']), this.fileSizeValidator(4096)]],
          fileName: [''],
          fileSize: [0],
          preview: ['']
        })
      }),

      schedule: this.fb.group({
        languages: [[], Validators.required],
        paymentMethods: [[], Validators.required],
        consultationDuration: ['', Validators.required],
        ...this.createDaysStructure()
      }),

      cabinet: this.fb.group({
        address: ['', Validators.required],
        governorate: ['', Validators.required],
        latitude: [null],
        longitude: [null]
      }),

      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  /*-----------------------------------------------------
    Hooks du Cycle de Vie
  -----------------------------------------------------*/
  ngOnInit(): void {
    this.loadLanguages(); // Chargement des langues
    this.schedule.valueChanges.subscribe(() => {
      this.schedule.updateValueAndValidity({ emitEvent: false });
    });
  }

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  /*-----------------------------------------------------
    Méthode de Chargement des Langues
  -----------------------------------------------------*/
  private loadLanguages(): void {
    const headers = new HttpHeaders()
      .set('Accept-Language', 'fr')
      .set('Ocp-Apim-Subscription-Key', 'VOTRE_CLE_API'); // Si nécessaire

    this.http.get<any>(
      'https://api.cognitive.microsofttranslator.com/languages?api-version=3.0',
      { headers }
    ).subscribe({
      next: (response) => {
        const translations = response.translation;
        this.languages = Object.values(translations)
          .map((lang: any) => lang.name)
          .filter(name => name) // Filtre les valeurs nulles
          .sort((a, b) => a.localeCompare(b, 'fr'));
      },
      error: (error) => {
        console.error('Erreur de chargement des langues', error);
        // Fallback en cas d'échec
        this.languages = ['Français', 'Arabe', 'Anglais', 'Allemand', 'Espagnol'];
      }
    });
  }


  /*-----------------------------------------------------
    Méthodes pour les Diplômes (Degree)
  -----------------------------------------------------*/
  createDegree(): FormGroup {
    return this.fb.group({
      degreeName: ['', Validators.required],
      institution: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900)]]
    });
  }

  get degrees(): FormArray {
    return this.registrationForm.get('education.degrees') as FormArray;
  }

  addDegree(): void {
    this.degrees.push(this.createDegree());
  }

  removeDegree(index: number): void {
    this.degrees.removeAt(index);
  }

  /*-----------------------------------------------------
    Méthodes pour l'Expérience Professionnelle
  -----------------------------------------------------*/
  createPosition(): FormGroup {
    return this.fb.group({
      position: ['', Validators.required],
      hospital: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]]
    });
  }

  get positions(): FormArray {
    return this.registrationForm.get('experience.positions') as FormArray;
  }

  addPosition(): void {
    this.positions.push(this.createPosition());
  }

  removePosition(index: number): void {
    this.positions.removeAt(index);
  }

  /*-----------------------------------------------------
    Méthodes pour l'Horaire (Schedule)
  -----------------------------------------------------*/
  // Modifier la méthode createDaysStructure()
  private createDaysStructure(): { [key: string]: FormGroup } {
    return this.days.reduce((acc: { [key: string]: FormGroup }, day) => {
      const dayKey = day.toLowerCase();
      acc[dayKey] = this.fb.group({
        sessionType: ['Fermé', Validators.required],
        times: this.fb.group({
          singleStart: [''],
          singleEnd: [''],
          firstStart: [''],
          firstEnd: [''],
          secondStart: [''],
          secondEnd: ['']
        })
      });
      return acc;
    }, {} as { [key: string]: FormGroup });
  }

  // Renvoie le groupe de temps pour un jour donné
  getDayTimeGroup(day: string): FormGroup {
    return this.schedule.get(day.toLowerCase())?.get('times') as FormGroup;
  }

  // Met à jour la validation en fonction du type de séance
  // Mettre à jour updateTimeValidation()
  updateTimeValidation(day: string): void {
    const dayGroup = this.schedule.get(day) as FormGroup;
    const sessionType = dayGroup.get('sessionType')?.value;
    const timesGroup = dayGroup.get('times') as FormGroup;

    // Réinitialiser tous les contrôles
    Object.keys(timesGroup.controls).forEach(controlName => {
      const control = timesGroup.get(controlName);
      control?.setValue('');
      control?.clearValidators();
      control?.updateValueAndValidity();
    });

    // Ajouter les validateurs conditionnels
    if (sessionType === 'Séance unique') {
      timesGroup.get('singleStart')?.addValidators([Validators.required, this.timeValidator]);
      timesGroup.get('singleEnd')?.addValidators([Validators.required, this.timeValidator]);
    }
    else if (sessionType === 'Double séance') {
      ['firstStart', 'firstEnd', 'secondStart', 'secondEnd'].forEach(control => {
        timesGroup.get(control)?.addValidators([Validators.required, this.timeValidator]);
      });
    }

    // Forcer la mise à jour de la validation
    timesGroup.updateValueAndValidity({ emitEvent: false });
    dayGroup.updateValueAndValidity({ emitEvent: false });
    this.schedule.updateValueAndValidity({ emitEvent: false });
  }

  /*-----------------------------------------------------
    Validateurs Personnalisés
  -----------------------------------------------------*/
  // Vérifie que le mot de passe et sa confirmation correspondent
  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Valide le format de l'heure (HH:mm)
  timeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    if (!/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      return { invalidTime: true };
    }
    return null;
  }

  // Valide le type de fichier
  fileTypeValidator(allowedTypes: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value as File;
      return file && !allowedTypes.includes(file.type) ? { fileType: true } : null;
    };
  }

  // Valide la taille du fichier (en Ko)
  fileSizeValidator(maxSizeKB: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value as File;
      return file && file.size > maxSizeKB * 1024 ? { fileSize: true } : null;
    };
  }

  /*-----------------------------------------------------
    Getters pour les Groupes et Contrôles du Formulaire
  -----------------------------------------------------*/
  get personalInfo(): FormGroup {
    return this.registrationForm.get('personalInfo') as FormGroup;
  }

  get education(): FormGroup {
    return this.registrationForm.get('education') as FormGroup;
  }

  get experience(): FormGroup {
    return this.registrationForm.get('experience') as FormGroup;
  }

  get schedule(): FormGroup {
    return this.registrationForm.get('schedule') as FormGroup;
  }

  get cabinet(): FormGroup {
    return this.registrationForm.get('cabinet') as FormGroup;
  }

  get profilePhoto(): FormGroup {
    return this.registrationForm.get('profilePhoto') as FormGroup;
  }

  get specialties(): FormArray {
    return this.education.get('specialties') as FormArray;
  }

  // Valide l'étape de l'expérience (positions et certification)
  get isExperienceStepValid(): boolean {
    return !this.experience.invalid &&
      this.positions.length > 0 &&
      (this.experience.get('certification.file')?.valid ?? false);
  }

  /*-----------------------------------------------------
    Soumission du Formulaire
  -----------------------------------------------------*/
  onSubmit(): void {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    console.log('Form data:', this.registrationForm.getRawValue());
    this.router.navigate(['/login']);
  }

  /*-----------------------------------------------------
    Gestion des Fichiers (Téléchargement et Prévisualisation)
  -----------------------------------------------------*/
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      // Réinitialise la valeur précédente et valide le nouveau fichier
      this.profilePhoto.get('file')?.setValue(null);
      this.profilePhoto.get('file')?.updateValueAndValidity();

      this.profilePhoto.get('file')?.setValue(file);

      if (this.profilePhoto.get('file')?.valid) {
        const reader = new FileReader();
        reader.onload = () => {
          this.profilePhotoPreview = reader.result;
          this.profilePhoto.patchValue({
            preview: reader.result,
            fileName: file.name,
            fileSize: file.size
          });
        };
        reader.readAsDataURL(file);
      } else {
        input.value = '';
        this.profilePhotoPreview = null;
        this.profilePhoto.reset({
          file: null,
          fileName: '',
          fileSize: 0,
          preview: null
        });
      }
    }
  }

  resetFileInput(): void {
    this.profilePhotoPreview = null;
    this.profilePhoto.reset({
      file: null,
      fileName: '',
      fileSize: 0,
      preview: null
    });
  }

  onCertificationSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const certificationGroup = this.experience.get('certification') as FormGroup;
      certificationGroup.get('file')?.setValue(null);
      certificationGroup.get('file')?.updateValueAndValidity();

      certificationGroup.get('file')?.setValue(file);

      if (certificationGroup.get('file')?.valid) {
        const reader = new FileReader();
        reader.onload = () => {
          this.certificationPreview = reader.result;
          certificationGroup.patchValue({
            preview: reader.result,
            fileName: file.name,
            fileSize: file.size
          });
        };
        reader.readAsDataURL(file);
      } else {
        input.value = '';
        this.certificationPreview = null;
        certificationGroup.reset({
          file: null,
          fileName: '',
          fileSize: 0,
          preview: null
        });
      }
    }
  }

  /*-----------------------------------------------------
    Interactions UI Diverses
  -----------------------------------------------------*/
  togglePasswordVisibility(field: 'password' | 'confirm'): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onLanguageChange(event: MatSelectChange): void {
    console.log('Language changed to:', event.value);
  }

  addSpecialty(): void {
    const specialty = this.fb.control('');
    this.specialties.push(specialty);
  }

  removeSpecialty(index: number): void {
    this.specialties.removeAt(index);
  }

  // Utile pour convertir un AbstractControl en FormControl
  asFormControl(control: AbstractControl): FormControl {
    return control as FormControl;
  }

  /*-----------------------------------------------------
    Intégration de la Carte (Leaflet)
  -----------------------------------------------------*/
  private initializeMap(): void {
    // Position par défaut (Tunisie)
    const defaultPosition: L.LatLngExpression = [36.8, 10.18];

    this.map = L.map('map').setView(defaultPosition, 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Gestion du clic sur la carte pour mettre à jour les coordonnées
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.updateCoordinates(e.latlng);
    });

    // Initialisation du marqueur avec les valeurs existantes (si présentes)
    this.updateMapMarker();
  }

  private updateCoordinates(latlng: L.LatLng): void {
    this.cabinet.patchValue({
      latitude: latlng.lat,
      longitude: latlng.lng
    });
    this.updateMapMarker();
  }

  private updateMapMarker(): void {
    const lat = this.cabinet.get('latitude')?.value;
    const lng = this.cabinet.get('longitude')?.value;

    if (lat && lng) {
      const position: L.LatLngExpression = [lat, lng];

      if (this.marker) {
        this.marker.setLatLng(position);
      } else {
        this.marker = L.marker(position)
          .addTo(this.map)
          .bindPopup('Position du cabinet');
      }

      this.map.setView(position, this.map.getZoom());
    }
  }

  getCurrentLocation(): void {
    this.geolocationError = '';

    if (!navigator.geolocation) {
      this.geolocationError = 'La géolocalisation n\'est pas supportée par votre navigateur';
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.cabinet.patchValue({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        this.updateMapMarker();
        this.map.setView([position.coords.latitude, position.coords.longitude], 15);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            this.geolocationError = 'Permission refusée - Activez la géolocalisation dans vos paramètres';
            break;
          case error.POSITION_UNAVAILABLE:
            this.geolocationError = 'Position indisponible';
            break;
          case error.TIMEOUT:
            this.geolocationError = 'Délai de requête dépassé';
            break;
          default:
            this.geolocationError = 'Erreur inconnue lors de la géolocalisation';
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }

  // Modifier isScheduleStepValid()
  isScheduleStepValid(): boolean {
    // Vérifier les contrôles principaux
    const mainControlsValid =
      this.schedule.get('languages')?.valid &&
      this.schedule.get('paymentMethods')?.valid &&
      this.schedule.get('consultationDuration')?.valid;

    if (!mainControlsValid) return false;

    // Vérifier chaque jour individuellement
    return this.days.every(day => {
      const dayGroup = this.schedule.get(day.toLowerCase()) as FormGroup;
      return dayGroup.valid;
    });
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  // Gestion de l'affichage du bouton
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.pageYOffset > 300;
  }
}