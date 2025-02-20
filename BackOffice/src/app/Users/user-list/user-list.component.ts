// Import des modules Angular et Material nécessaires
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { User } from '../User.model';
import { UserService } from '../../Services/UserServices/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html', // Fichier template HTML
  styleUrls: ['./user-list.component.css'], // Fichier de styles CSS
  standalone: false, // Composant intégré dans un module
})
export class UserListComponent implements AfterViewInit {
  // Configuration des colonnes du tableau
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'Status', 'actions'];
  
  // Source de données pour le tableau Material
  dataSource: MatTableDataSource<User>;
  
  // Stockage des filtres par colonne
  filters: { [key: string]: string } = {};

  // Références aux composants Material
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog, // Service de boîtes de dialogue
    private userService: UserService // Service de gestion des utilisateurs
  ) {
    // Initialisation de la source de données
    this.dataSource = new MatTableDataSource(this.userService.getUsers());
  }

  /**
   * Hook Angular après l'initialisation de la vue
   */
  ngAfterViewInit() {
    // Configuration de la pagination et du tri
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Définition d'un filtre personnalisé
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const filterObject = JSON.parse(filter); // Conversion du filtre en objet
      return Object.keys(filterObject).every(key => {
        if (!filterObject[key]) return true; // Ignore les filtres vides
        const value = data[key as keyof User]?.toString().toLowerCase();
        return value?.includes(filterObject[key].toLowerCase());
      });
    };
  }

  /**
   * Applique un filtre sur une colonne spécifique
   * @param value - Valeur du filtre
   * @param column - Colonne à filtrer
   */
  applyFilter(value: string, column: string): void {
    this.filters[column] = value; // Mise à jour du filtre
    this.dataSource.filter = JSON.stringify(this.filters); // Application du filtre
    
    // Réinitialisation de la pagination
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Supprime un utilisateur
   * @param userId - ID de l'utilisateur à supprimer
   */
  deleteUser(userId: number): void {
    this.userService.deleteUser(userId);
    this.refreshDataSource(); // Actualisation des données
  }

  /**
   * Ouvre la boîte de dialogue d'édition
   * @param user - Utilisateur à modifier
   */
  openEditDialog(user: User): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '600px', // Taille de la boîte de dialogue
      data: { user: { ...user } } // Copie de l'utilisateur pour immutabilité
    });

    // Gestion du retour de la boîte de dialogue
    dialogRef.afterClosed().subscribe(updatedUser => {
      if (updatedUser) {
        this.userService.updateUser(updatedUser);
        this.refreshDataSource(); // Actualisation des données
      }
    });
  }

  /**
   * Actualise la source de données
   */
  private refreshDataSource(): void {
    this.dataSource.data = this.userService.getUsers(); // Recharge les données
    this.dataSource._updateChangeSubscription(); // Force la mise à jour
  }
}