// Import des modules Angular et RxJS nécessaires
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Specialty } from '../specialty.model';

// Décorateur pour fournir le service au niveau racine de l'application
@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  // Liste initiale des spécialités (données mockées)
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
  // Subject RxJS pour émettre les modifications de la liste
  private specialties$ = new BehaviorSubject<Specialty[]>(this.specialties);

  constructor() {
    // Le constructeur reste vide car aucune dépendance n'est nécessaire
  }

  /**
   * Récupère la liste observable des spécialités
   * @returns Observable<Specialty[]> - Flux observable des spécialités
   */
  getSpecialties(): Observable<Specialty[]> {
    // Convertit le BehaviorSubject en Observable pour empêcher les modifications externes
    return this.specialties$.asObservable();
  }

  /**
   * Ajoute une nouvelle spécialité à la liste
   * @param specialty - Objet Specialty à ajouter (sans id)
   */
  addSpecialty(specialty: Specialty): void {
    // Génération des métadonnées
    specialty.id = this.generateId();
    specialty.createdAt = new Date();
    specialty.updatedAt = new Date();

    // Ajout à la liste et émission de la nouvelle version
    this.specialties.push(specialty);
    this.specialties$.next([...this.specialties]); // Émission d'une nouvelle référence
  }

  /**
   * Supprime une spécialité par son ID
   * @param id - ID de la spécialité à supprimer
   */
  deleteSpecialty(id: number): void {
    // Filtrage et mise à jour de la liste
    this.specialties = this.specialties.filter(s => s.id !== id);
    this.specialties$.next([...this.specialties]); // Notification des observers
  }

  /**
   * Génère un nouvel ID unique incrémentiel
   * @returns number - Nouvel ID disponible
   */
  private generateId(): number {
    // Trouve l'ID maximum existant et ajoute 1
    return Math.max(...this.specialties.map(s => s.id)) + 1;
  }
}