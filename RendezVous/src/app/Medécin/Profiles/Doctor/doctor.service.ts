// doctor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Doctor, Education, Experience, Schedule, Cabinet  } from '../doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private currentDoctorSubject: BehaviorSubject<Doctor>;
  public currentDoctor$: Observable<Doctor>;

  constructor() { 
    const initialDoctor = this.getInitialDoctor();
    this.currentDoctorSubject = new BehaviorSubject<Doctor>(initialDoctor);
    this.currentDoctor$ = this.currentDoctorSubject.asObservable();
  }

  private getInitialDoctor(): Doctor {
    const storedDoctor = localStorage.getItem('currentDoctor');
    return storedDoctor ? JSON.parse(storedDoctor) : this.createMockDoctor();
  }

  private createMockDoctor(): Doctor {
    const mockDoctor: Doctor = {
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
        specialties: [ // Structure corrigée
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
      schedule: {
        lundi: {
          sessionType: 'Double séance',
          times: {
            firstStart: '08:00',
            firstEnd: '12:00',
            secondStart: '14:00',
            secondEnd: '18:00'
          }
        },
        mardi: {
          sessionType: 'Séance unique',
          times: {
            singleStart: '09:00',
            singleEnd: '17:00'
          }
        }
      },
      practiceInfo: { // Retirer le ? pour le rendre obligatoire
        languages:[ // Structure corrigée
          'arabe' , 'Francais'
        ],
        paymentMethods: [
          'Cheque','espece'
        ],
        consultationDuration:15 ,
      },
    };
    this.saveToLocalStorage(mockDoctor);
    return mockDoctor;
  }

  

  // Mock des méthodes de mise à jour
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

    // La méthode existe déjà correctement :
  // doctor.service.ts
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

  updateSchedule(schedule: Schedule): void {
    const currentDoctor = this.currentDoctorSubject.value;
    if (currentDoctor) {
      currentDoctor.schedule = schedule;
      this.saveToLocalStorage(currentDoctor);
    }
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

  // Méthodes utilitaires
  getCurrentDoctor(): Doctor {
    return this.currentDoctorSubject.value;
  }
  private loadFromLocalStorage(): void {
    const storedDoctor = localStorage.getItem('currentDoctor');
    this.currentDoctorSubject.next(storedDoctor ? JSON.parse(storedDoctor) : undefined);
  }

  private saveToLocalStorage(doctor: Doctor): void {
    localStorage.setItem('currentDoctor', JSON.stringify(doctor));
    this.currentDoctorSubject.next(doctor);
  }

  // Dans DoctorService
  updateDoctor(doctor: Doctor): Observable<Doctor> {
    return new Observable(observer => {
      this.saveToLocalStorage(doctor);
      observer.next(doctor);
      observer.complete();
    });
  }
}