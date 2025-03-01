// doctor.service.ts
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Doctor, Office, Education, Experience } from '../../Models/doctor.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:8081/api/auth';
  private currentDoctorSubject: BehaviorSubject<Doctor>;
  public currentDoctor$: Observable<Doctor>;

  constructor(private http: HttpClient) {
    const initialDoctor = this.getInitialDoctor();
    this.currentDoctorSubject = new BehaviorSubject<Doctor>(initialDoctor);
    this.currentDoctor$ = this.currentDoctorSubject.asObservable();
  }

  // doctor.service.ts
registerDoctor(formData: FormData): Observable<Doctor> {
  return this.http.post<Doctor>(`${this.apiUrl}/register/doctor`, formData);
}

  private getInitialDoctor(): Doctor {
    const storedDoctor = localStorage.getItem('currentDoctor');
    return storedDoctor ? JSON.parse(storedDoctor) : this.createMockDoctor();
  }

  private createMockDoctor(): Doctor {
    return {
      firstName: 'Adem',
      lastName: 'Meddeb',
      cin: '14434092',
      gender: 'MALE',
      age: 22,
      phoneNumber: '58270519',
      email: 'meddebadem000@gmail.com',
      billingAddress: 'Bouargoub, Nabeul',
      password: 'tempPassword',
      office: {
        address: 'Mrezga, Nabeul',
        governorate: 'Nabeul',
        latitude: 36.5377,
        longitude: 3.9458,
      },
      specializationIds: [1, 2],
      languages: ['French', 'Arabic'],
      paymentMethods: ['CASH', 'CREDIT_CARD'],
      education: [
        {
          name: 'Doctorat en Médecine',
          establishment: 'Université de Tunis El Manar',
          year: 2022
        }
      ],
      experience: [
        {
          name: 'Médecin Chef',
          establishment: 'Hôpital Charles Nicolle',
          duration: '8 years'
        }
      ],
      profilePhotoUrl: 'assets/adem.jpg',
      aptitudeCertificateUrl: 'assets/aptitude.jpg'
    };
  }

  private validateDoctorStructure(doctor: Doctor): Doctor {
    // Ensure required arrays are initialized
    if (!doctor.specializationIds) doctor.specializationIds = [];
    if (!doctor.languages) doctor.languages = [];
    if (!doctor.paymentMethods) doctor.paymentMethods = [];
    if (!doctor.education) doctor.education = [];
    if (!doctor.experience) doctor.experience = [];
    
    return doctor;
  }

  updatePersonalInfo(info: Partial<Doctor>): void {
    const currentDoctor = this.currentDoctorSubject.value;
    const updatedDoctor = { ...currentDoctor, ...info };
    this.saveToLocalStorage(updatedDoctor);
  }

  addEducation(education: Education): void {
    const currentDoctor = this.currentDoctorSubject.value;
    currentDoctor.education.push(education);
    this.saveToLocalStorage(currentDoctor);
  }

  addExperience(experience: Experience): void {
    const currentDoctor = this.currentDoctorSubject.value;
    currentDoctor.experience.push(experience);
    this.saveToLocalStorage(currentDoctor);
  }

  updateOffice(office: Office): void {
    const currentDoctor = this.currentDoctorSubject.value;
    currentDoctor.office = office;
    this.saveToLocalStorage(currentDoctor);
  }

  uploadProfilePhoto(url: string): void {
    const currentDoctor = this.currentDoctorSubject.value;
    currentDoctor.profilePhotoUrl = url;
    this.saveToLocalStorage(currentDoctor);
  }

  uploadCertification(url: string): void {
    const currentDoctor = this.currentDoctorSubject.value;
    currentDoctor.aptitudeCertificateUrl = url;
    this.saveToLocalStorage(currentDoctor);
  }

  getCurrentDoctor(): Doctor {
    return this.validateDoctorStructure(this.currentDoctorSubject.value);
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