import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Specialty } from '../specialty.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  private specialties: Specialty[] = [
    { 
      id: 1, 
      name: 'Médecine Générale', 
      description: 'Médecine générale et soins primaires',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 2, 
      name: 'Gynécologie-Obstétrique', 
      description: 'Santé féminine et suivi de grossesse',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 3, 
      name: 'Cardiologie', 
      description: 'Pathologies cardiaques et vasculaires',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 4, 
      name: 'Pédiatrie', 
      description: 'Santé infantile et développement de l\'enfant',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 5, 
      name: 'Orthopédie-Traumatologie', 
      description: 'Troubles musculo-squelettiques et fractures',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 6, 
      name: 'Dermatologie', 
      description: 'Maladies cutanées et problèmes dermatologiques',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 7, 
      name: 'Ophtalmologie', 
      description: 'Troubles oculaires et chirurgie des yeux',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 8, 
      name: 'Otorhinolaryngologie (ORL)', 
      description: 'Pathologies ORL et troubles auditifs',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 9, 
      name: 'Radiologie', 
      description: 'Imagerie médicale et diagnostic',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 10, 
      name: 'Chirurgie Générale', 
      description: 'Interventions chirurgicales courantes',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 11, 
      name: 'Endocrinologie-Diabétologie', 
      description: 'Troubles hormonaux et gestion du diabète',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 12, 
      name: 'Neurologie', 
      description: 'Maladies du système nerveux',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 13, 
      name: 'Psychiatrie', 
      description: 'Troubles mentaux et santé psychologique',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 14, 
      name: 'Gastro-entérologie', 
      description: 'Pathologies digestives et hépatiques',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 15, 
      name: 'Urologie', 
      description: 'Santé urinaire et génito-urinaire',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  private specialties$ = new BehaviorSubject<Specialty[]>(this.specialties);

  constructor() { }

  getSpecialties(): Observable<Specialty[]> {
    return this.specialties$.asObservable();
  }

  addSpecialty(specialty: Specialty): void {
    specialty.id = this.generateId();
    specialty.createdAt = new Date();
    specialty.updatedAt = new Date();
    this.specialties.push(specialty);
    this.specialties$.next([...this.specialties]);
  }

  deleteSpecialty(id: number): void {
    this.specialties = this.specialties.filter(s => s.id !== id);
    this.specialties$.next([...this.specialties]);
  }

  private generateId(): number {
    return Math.max(...this.specialties.map(s => s.id)) + 1;
  }
}