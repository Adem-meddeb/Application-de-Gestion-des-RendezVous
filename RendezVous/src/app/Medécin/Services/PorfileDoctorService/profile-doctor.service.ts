import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Doctor, Office, Education, Experience } from '../../Models/ProfileDoctor.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DoctorRequestDTO, OfficeDTO, EducationDTO, ExperienceDTO } from '../../Models/doctor.dto';

@Injectable({
  providedIn: 'root'
})
export class ProfileDoctorService {
  private readonly API_URL = 'http://localhost:8081/api/doctors';

  private currentDoctorSubject: BehaviorSubject<Doctor | null>;
  public currentDoctor$: Observable<Doctor | null>;

  constructor(private http: HttpClient) {
    this.currentDoctorSubject = new BehaviorSubject<Doctor | null>(null);
    this.currentDoctor$ = this.currentDoctorSubject.asObservable();
  }

  // profile-doctor.service.ts
getCurrentDoctor(): Observable<Doctor> {
  return this.http.get<Doctor>(`${this.API_URL}/my-profile`, { // <- Changé de 'me' à 'my-profile'
    headers: new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }).pipe(
    tap(doctor => this.currentDoctorSubject.next(doctor))
  );
}


  getDoctor(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.API_URL}/${id}`);
  }

  updateDoctor(id: number, doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.API_URL}/${id}`, this.mapToRequestDTO(doctor));
  }

  updateCabinetInfo(doctorId: number, office: Office): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.API_URL}/${doctorId}/office`, office);
  }

  private mapToRequestDTO(doctor: Doctor): DoctorRequestDTO {
    return {
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      cin: doctor.cin,
      gender: doctor.gender,
      age: doctor.age,
      phoneNumber: doctor.phoneNumber,
      email: doctor.email,
      billingAddress: doctor.billingAddress,
      office: doctor.office,
      specializationIds: doctor.specializations.map(s => s.id),
      languages: doctor.languages,
      paymentMethods: doctor.paymentMethods,
      education: doctor.education,
      experience: doctor.experience,
      profilePhotoBytes: this.base64ToBytes(doctor.profilePhoto),
      aptitudeCertificateBytes: this.base64ToBytes(doctor.aptitudeCertificate)
    };
  }

  private base64ToBytes(base64?: string): Uint8Array | null {
    if (!base64) return null;
    
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    return bytes;
  }

  uploadProfilePhoto(doctorId: number, formData: FormData): Observable<Doctor> {
    return this.http.put<Doctor>(
      `${this.API_URL}/${doctorId}/profile-photo`,
      formData
    ).pipe(
      tap(updatedDoctor => this.currentDoctorSubject.next(updatedDoctor))
    );
  }
  
  uploadAptitudeCertificate(doctorId: number, formData: FormData): Observable<Doctor> {
    return this.http.put<Doctor>(
      `${this.API_URL}/${doctorId}/aptitude-certificate`,
      formData
    ).pipe(
      tap(updatedDoctor => this.currentDoctorSubject.next(updatedDoctor))
    );
  }

}