// doctor.service.ts
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Doctor, Education, Experience, Cabinet } from '../../Models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private currentDoctorSubject: BehaviorSubject<Doctor>;
  public currentDoctor$: Observable<Doctor>;
  private readonly days = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

  constructor() {
    const initialDoctor = this.getInitialDoctor();
    this.currentDoctorSubject = new BehaviorSubject<Doctor>(initialDoctor);
    this.currentDoctor$ = this.currentDoctorSubject.asObservable();
  }

  private getInitialDoctor(): Doctor {
    const storedDoctor = localStorage.getItem('currentDoctor');
    return storedDoctor ? JSON.parse(storedDoctor) : this.createMockDoctor();
  }

  private createEmptySchedule() {
    const schedule: any = {};
    this.days.forEach(day => {
      schedule[day] = {
        sessionType: 'Fermé',
        times: {
          singleStart: '',
          singleEnd: '',
          firstStart: '',
          firstEnd: '',
          secondStart: '',
          secondEnd: ''
        }
      };
    });
    return schedule;
  }

  private createMockDoctor(): Doctor {
    const schedule = this.createEmptySchedule();

    schedule.mardi.sessionType = 'Séance unique';
    schedule.mardi.times.singleStart = '08:00';
    schedule.mardi.times.singleEnd = '12:00';

    schedule.mercredi.sessionType = 'Séance unique';
    schedule.mercredi.times.singleStart = '09:00';
    schedule.mercredi.times.singleEnd = '13:00';

    schedule.jeudi.sessionType = 'Double séance';
    schedule.jeudi.times.firstStart = '08:00';
    schedule.jeudi.times.firstEnd = '12:00';
    schedule.jeudi.times.secondStart = '14:00';
    schedule.jeudi.times.secondEnd = '18:00';

    schedule.vendredi.sessionType = 'Séance unique';
    schedule.vendredi.times.singleStart = '09:00';
    schedule.vendredi.times.singleEnd = '13:00';

    schedule.samedi.sessionType = 'Double séance';
    schedule.samedi.times.firstStart = '08:00';
    schedule.samedi.times.firstEnd = '12:00';
    schedule.samedi.times.secondStart = '14:00';
    schedule.samedi.times.secondEnd = '18:00';

    return {
      personalInfo: {
        firstName: 'Adem',
        lastName: 'Meddeb',
        cin: '14434092',
        gender: 'male',
        age: 22,
        phone: '58270519',
        address: 'Bouargoub, Nabeul',
        email: 'meddebadem000@gmail.com',
        profilePhoto: 'assets/adem.jpg'
      },
      education: {
        degrees: [
          {
            degreeName: 'Doctorat en Médecine',
            institution: 'Université de Tunis El Manar',
            year: 2022
          }
        ],
        specialties: [
          { name: 'Cardiologie', aptitude: '...' },
          { name: 'Médecine Interne', aptitude: '...' }
        ]
      },
      experience: {
        positions: [
          {
            position: 'Médecin Chef',
            hospital: 'Hôpital Charles Nicolle',
            duration: 8
          }
        ],
        certification: {
          file: 'assets/aptitude.jpg',
          fileName: 'aptitude.jpg',
          fileSize: 1024
        }
      },
      cabinet: {
        address: 'Mrezga, Nabeul',
        governorate: 'Nabeul',
        latitude: 36.5377,
        longitude: 3.9458,
      },
      practiceInfo: {
        languages: ['Français', 'Arabe'],
        paymentMethods: ['Espèces', 'Carte bancaire'],
        consultationDuration: 30,
        schedule: schedule
      }
    };
  }

  private validateDoctorStructure(doctor: Doctor): Doctor {
    // Garantir l'existence de toutes les propriétés
    if (!doctor.practiceInfo?.schedule) {
      doctor.practiceInfo.schedule = this.createEmptySchedule();
    }
    return doctor;
  }

  updatePersonalInfo(info: any): void {
    const currentDoctor = this.currentDoctorSubject.value;
    if (currentDoctor) {
      currentDoctor.personalInfo = { ...currentDoctor.personalInfo, ...info };
      this.saveToLocalStorage(currentDoctor);
    }
  }

  addEducation(education: Education): void {
    const currentDoctor = this.currentDoctorSubject.value;
    if (currentDoctor?.education) {
      currentDoctor.education.degrees.push(education);
      this.saveToLocalStorage(currentDoctor);
    }
  }

  addExperience(experience: Experience): void {
    const currentDoctor = this.currentDoctorSubject.value;
    if (currentDoctor?.experience) {
      currentDoctor.experience.positions.push(experience);
      this.saveToLocalStorage(currentDoctor);
    }
  }

  updateCabinetInfo(cabinet: Cabinet): Observable<void> {
    return new Observable(observer => {
      const currentDoctor = this.currentDoctorSubject.value;
      if (currentDoctor) {
        currentDoctor.cabinet = cabinet;
        this.saveToLocalStorage(currentDoctor);
        observer.next();
        observer.complete();
      } else {
        observer.error('Aucun médecin connecté');
      }
    });
  }

  uploadProfilePhoto(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const currentDoctor = this.currentDoctorSubject.value;
      if (currentDoctor?.personalInfo) {
        currentDoctor.personalInfo.profilePhoto = e.target.result;
        this.saveToLocalStorage(currentDoctor);
      }
    };
    reader.readAsDataURL(file);
  }

  getCurrentDoctor(): Doctor {
    return this.validateDoctorStructure(this.currentDoctorSubject.value);
  }

  private loadFromLocalStorage(): void {
    const storedDoctor = localStorage.getItem('currentDoctor');
    const doctor = storedDoctor ? JSON.parse(storedDoctor) : this.createMockDoctor();
    this.currentDoctorSubject.next(this.validateDoctorStructure(doctor));
  }

  private saveToLocalStorage(doctor: Doctor): void {
    const validatedDoctor = this.validateDoctorStructure(doctor);
    localStorage.setItem('currentDoctor', JSON.stringify(validatedDoctor));
    this.currentDoctorSubject.next(validatedDoctor);
  }

  updateDoctor(doctor: Doctor): Observable<Doctor> {
    return new Observable(observer => {
      const validatedDoctor = this.validateDoctorStructure(doctor);
      this.saveToLocalStorage(validatedDoctor);
      observer.next(validatedDoctor);
      observer.complete();
    });
  }
}