// Import des modules Angular nécessaires
import { Injectable } from '@angular/core';
import { User } from '../../Users/User.model';

@Injectable({
  providedIn: 'root' // Service disponible globalement
})
export class UserService {
  // Données mockées d'utilisateurs (simulation de base de données)
  private users: User[] = [
    // Exemple d'utilisateur 1
    {
      id: 1,
      firstName: 'Adem',
      lastName: 'Meddeb',
      cin: '14434092',
      gender: 'Masculin',
      phone: '58270519',
      address: 'Bouargoub Nabeul',
      password: '123456789',
      specialty: 'Pédiatre',
      education: {
        diplomaName: 'IT',
        institution: 'aa',
        year: 2020,
      },
      experience: {
        Poste: 'IT',
        institution: 'aa',
        year: 2020,
      },
      formations: 'aa',
      availability: 'aa',
      profilePhoto: 'assets/doc1.jpg',
      email: 'meddebadem000@gmail.com',
      role: 'Medécin',
      Status: 'approved',
      age: 21,
      professionalAptitudePhoto: 'aa',
      aptitude: {
        photoUrl: 'https://i.pinimg.com/474x/d5/f8/ef/d5f8ef1dac7ef2ddaff7e0da3c4ffb6d.jpg',
        verified: true,
        verificationDate: new Date(2020, 1, 10),
      },
      cabinet: {
        address: 'Bouargoub Nabeul',
        governorate: 'Nabeul',
        latitude: 36.4529,
        longitude: 10.7347
      },
      schedule: {
        config: {
          languages: ['Français', 'Arabe'],
          paymentMethods: ['Espèces', 'Carte bancaire'],
          consultationDuration: 30
        },
        days: {
          lundi: {
            sessionType: 'Séance unique',
            times: { singleStart: '08:00', singleEnd: '12:00' }
          },
          mardi: {
            sessionType: 'Double séance',
            times: {
              firstStart: '09:00',
              firstEnd: '12:00',
              secondStart: '14:00',
              secondEnd: '17:00'
            }
          },
          mercredi: {
            sessionType: 'Fermé',
            times: {}
          },
          jeudi: {
            sessionType: 'Séance unique',
            times: { singleStart: '10:00', singleEnd: '16:00' }
          },
          vendredi: {
            sessionType: 'Double séance',
            times: {
              firstStart: '08:30',
              firstEnd: '12:30',
              secondStart: '14:30',
              secondEnd: '18:00'
            }
          },
          samedi: {
            sessionType: 'Séance unique',
            times: { singleStart: '09:00', singleEnd: '13:00' }
          },
          dimanche: {
            sessionType: 'Fermé',
            times: {}
          }
        }
      }
    },
    // Exemple d'utilisateur 2
    {
      id: 2,
      firstName: 'Yassin',
      lastName: 'Mansour',
      cin: '12345678',
      gender: 'Masculin',
      phone: '12345678',
      address: 'Bouargoub Nabeul',
      password: '123456789',
      specialty: 'Pédiatre',
      education: {
        diplomaName: 'IT',
        institution: 'aa',
        year: 2020,
      },
      experience: {
        Poste: 'IT',
        institution: 'aa',
        year: 2020,
      },
      formations: 'aa',
      availability: 'aa',
      profilePhoto: 'assets/doc1.jpg',
      email: 'meddebadem000@gmail.com',
      Status: 'approved',
      role: 'Medécin',
      age: 21,
      professionalAptitudePhoto: 'aa',
      aptitude: {
        photoUrl: 'https://i.pinimg.com/474x/d5/f8/ef/d5f8ef1dac7ef2ddaff7e0da3c4ffb6d.jpg',
        verified: false,
        verificationDate: new Date(2020, 1, 10),
      },
      cabinet: {
        address: 'Bouargoub Nabeul',
        governorate: 'Nabeul',
        latitude: 36.4529,
        longitude: 10.7347
      },
      schedule: {
        config: {
          languages: ['Français', 'Arabe'],
          paymentMethods: ['Espèces', 'Carte bancaire'],
          consultationDuration: 30
        },
        days: {
          lundi: {
            sessionType: 'Séance unique',
            times: { singleStart: '08:00', singleEnd: '12:00' }
          },
          mardi: {
            sessionType: 'Double séance',
            times: {
              firstStart: '09:00',
              firstEnd: '12:00',
              secondStart: '14:00',
              secondEnd: '17:00'
            }
          },
          mercredi: {
            sessionType: 'Séance unique',
            times: { singleStart: '08:00', singleEnd: '12:00' }
          },
          jeudi: {
            sessionType: 'Séance unique',
            times: { singleStart: '08:00', singleEnd: '12:00' }
          },
          vendredi: {
            sessionType: 'Séance unique',
            times: { singleStart: '08:00', singleEnd: '12:00' }
          },
          samedi: {
            sessionType: 'Séance unique',
            times: { singleStart: '08:00', singleEnd: '12:00' }
          },
          dimanche: {
            sessionType: 'Séance unique',
            times: { singleStart: '08:00', singleEnd: '12:00' }
          }
        }
      }
    }
  ];

  constructor() { } // Aucune dépendance injectée

  /**
   * Récupère tous les utilisateurs (copie pour éviter les modifications directes)
   * @returns Copie du tableau d'utilisateurs
   */
  getUsers(): User[] {
    return this.users.map(user => ({ ...user }));
  }

  /**
   * Trouve un utilisateur par son ID
   * @param id - ID de l'utilisateur recherché
   * @returns Copie de l'utilisateur ou undefined
   */
  getUserById(id: number): User | undefined {
    const user = this.users.find(u => u.id === id);
    return user ? { ...user } : undefined;
  }

  /**
   * Met à jour un utilisateur existant
   * @param updatedUser - Utilisateur avec nouvelles données
   */
  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(u => u.id === updatedUser.id);
    if (index > -1) {
      this.users[index] = { ...updatedUser }; // Mise à jour immuable
    }
  }

  /**
   * Supprime un utilisateur par son ID
   * @param userId - ID de l'utilisateur à supprimer
   */
  deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
  }

  /**
   * Crée un nouvel utilisateur
   * @param newUser - Nouvel utilisateur à ajouter
   */
  createUser(newUser: User): void {
    newUser.id = this.generateNewId(); // Génération d'ID unique
    this.users.push({ ...newUser }); // Ajout immuable
  }

  /**
   * Génère un nouvel ID unique incrémentiel
   * @returns Nouvel ID disponible
   */
  private generateNewId(): number {
    return Math.max(...this.users.map(u => u.id)) + 1;
  }

  /**
   * Fournit un utilisateur vide prêt à être rempli
   * @returns Objet User avec valeurs par défaut
   */
  getEmptyUser(): User {
    return {
      id: 0,
      firstName: '',
      lastName: '',
      cin: '',
      gender: 'Masculin',
      phone: '',
      address: '',
      password: '',
      specialty: '',
      education: {
        diplomaName: '',
        institution: '',
        year: new Date().getFullYear()
      },
      experience: {
        Poste: '',
        institution: '',
        year: new Date().getFullYear()
      },
      formations: '',
      availability: '',
      email: '',
      Status: 'pending',
      role: 'Medécin',
      age: 0,
      professionalAptitudePhoto: '',
      aptitude: {
        photoUrl: '',
        verified: false
      },
      cabinet: {
        address: '',
        governorate: '',
        latitude: 0,
        longitude: 0
      },
      schedule: this.getEmptySchedule() // Structure vide pour l'emploi du temps
    };
  }

  /**
  * Crée un emploi du temps vide
  * @returns Structure vide d'emploi du temps
  */
  private getEmptySchedule(): User['schedule'] {
    return {
      config: {
        languages: [],
        paymentMethods: [],
        consultationDuration: 30 // Durée par défaut
      },
      days: {
        // Initialisation de tous les jours comme fermés
        lundi: { sessionType: 'Fermé', times: {} },
        mardi: { sessionType: 'Fermé', times: {} },
        mercredi: { sessionType: 'Fermé', times: {} },
        jeudi: { sessionType: 'Fermé', times: {} },
        vendredi: { sessionType: 'Fermé', times: {} },
        samedi: { sessionType: 'Fermé', times: {} },
        dimanche: { sessionType: 'Fermé', times: {} }
      }
    };
  }
}