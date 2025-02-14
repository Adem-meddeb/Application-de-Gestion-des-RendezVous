import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditUserComponent } from '../edit-user/edit-user.component';

export interface User {
  id: number;
  // Informations personnelles
  firstName: string;
  lastName: string;
  cin: string;
  gender: string;
  phone: string;
  address: string;
  password: string;
  // Professionnelles
  specialty: string;
  education: {
    diplomaName: string;
    institution: string;
    year: number;
    // Ajoutez d'autres champs au besoin

  };
  experience: {
    Poste: string;
    institution: string;
    year: number;
    // Ajoutez d'autres champs au besoin
  },
  formations: string;
  availability: string;
  // Autres
  profilePhoto?: string;
  email: string;
  Status: string;
  role: string;
  age: number;
  professionalAptitudePhoto: string;
  aptitude: {
    photoUrl: string;
    verified: boolean;
    verificationDate?: Date;
  };
  cabinet: {
    address: string, // Adresse complète
    governorate: string,       // Gouvernorat
    latitude: number,          // Coordonnée GPS latitude
    longitude: number,          // Coordonnée GPS longitude
  };
  schedule: {
    // Configuration générale
    config: {
      languages: string[];
      paymentMethods: string[];
      consultationDuration: number;
    };

    // Jours avec signature d'index
    days: {
      [key: string]: {
        sessionType: string;
        times: {
          singleStart?: string;
          singleEnd?: string;
          firstStart?: string;
          firstEnd?: string;
          secondStart?: string;
          secondEnd?: string;
        };
      };
      lundi: {
        sessionType: string;
        times: {
          singleStart?: string;
          singleEnd?: string;
          firstStart?: string;
          firstEnd?: string;
          secondStart?: string;
          secondEnd?: string;
        };
      };
      mardi: {
        sessionType: string;
        times: {
          singleStart?: string;
          singleEnd?: string;
          firstStart?: string;
          firstEnd?: string;
          secondStart?: string;
          secondEnd?: string;
        };
      };
      mercredi: {
        sessionType: string;
        times: {
          singleStart?: string;
          singleEnd?: string;
          firstStart?: string;
          firstEnd?: string;
          secondStart?: string;
          secondEnd?: string;
        };
      };
      jeudi: {
        sessionType: string;
        times: {
          singleStart?: string;
          singleEnd?: string;
          firstStart?: string;
          firstEnd?: string;
          secondStart?: string;
          secondEnd?: string;
        };
      };
      vendredi: {
        sessionType: string;
        times: {
          singleStart?: string;
          singleEnd?: string;
          firstStart?: string;
          firstEnd?: string;
          secondStart?: string;
          secondEnd?: string;
        };
      };
      samedi: {
        sessionType: string;
        times: {
          singleStart?: string;
          singleEnd?: string;
          firstStart?: string;
          firstEnd?: string;
          secondStart?: string;
          secondEnd?: string;
        };
      };
      dimanche: {
        sessionType: string;
        times: {
          singleStart?: string;
          singleEnd?: string;
          firstStart?: string;
          firstEnd?: string;
          secondStart?: string;
          secondEnd?: string;
        };
      };
    };
  };
}

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'Status', 'actions'];
  dataSource: MatTableDataSource<User>;
  filters: { [key: string]: string } = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.getDummyData());


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const filterObject = JSON.parse(filter);
      return Object.keys(filterObject).every(key => {
        if (!filterObject[key]) return true;
        return data[key as keyof User]?.toString().toLowerCase().includes(filterObject[key].toLowerCase());
      });
    };
  }

  applyFilter(value: string, column: string): void {
    this.filters[column] = value;
    this.dataSource.filter = JSON.stringify(this.filters);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(userId: number): void {
    this.dataSource.data = this.dataSource.data.filter(user => user.id !== userId);
  }

  private getDummyData(): User[] {
    return [
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
        cabinet: { // Déplacé en dehors du schedule
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
  }


  // Ajoutez cette méthode
  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '600px',
      data: { user: { ...user } } // Crée une copie de l'utilisateur
    });

    dialogRef.afterClosed().subscribe(updatedUser => {
      if (updatedUser) {
        const index = this.dataSource.data.findIndex(u => u.id === updatedUser.id);
        if (index > -1) {
          this.dataSource.data[index] = updatedUser;
          this.dataSource._updateChangeSubscription();
        }
      }
    });
  }


}