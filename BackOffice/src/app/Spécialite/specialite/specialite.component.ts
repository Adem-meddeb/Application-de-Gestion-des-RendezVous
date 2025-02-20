// Import des modules Angular et Material nécessaires
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Specialty } from '../specialty.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SpecialtyService } from '../../Services/SpecService/specialty.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSpecialityComponent } from '../add-speciality/add-speciality.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-specialite',
  standalone: false,
  templateUrl: './specialite.component.html', // Fichier template HTML
  styleUrl: './specialite.component.css' // Feuille de style CSS
})
export class SpecialiteComponent implements OnInit {
  // Configuration des colonnes du tableau
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  
  // Source de données pour le tableau Material
  dataSource!: MatTableDataSource<Specialty>;

  // Références aux composants Material
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private specialtyService: SpecialtyService, // Service de gestion des spécialités
    private dialog: MatDialog, // Service de boîtes de dialogue
    private snackBar: MatSnackBar // Service de notifications
  ) {}

  /**
   * Hook d'initialisation du composant
   */
  ngOnInit(): void {
    this.loadSpecialties();
  }

  /**
   * Charge les spécialités depuis le service
   */
  private loadSpecialties(): void {
    this.specialtyService.getSpecialties().subscribe(specialties => {
      // Initialise la source de données
      this.dataSource = new MatTableDataSource(specialties);
      
      // Configure la pagination et le tri
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  /**
   * Ouvre la boîte de dialogue d'ajout
   */
  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddSpecialityComponent, {
      width: '500px' // Taille de la boîte de dialogue
    });

    // Gestion de la fermeture de la boîte de dialogue
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.specialtyService.addSpecialty(result); // Ajoute la nouvelle spécialité
        this.showNotification('Spécialité ajoutée avec succès');
        this.loadSpecialties(); // Recharge les données
      }
    });
  }

  /**
   * Supprime une spécialité après confirmation
   * @param id - ID de la spécialité à supprimer
   */
  deleteSpecialty(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette spécialité ?')) {
      this.specialtyService.deleteSpecialty(id);
      this.showNotification('Spécialité supprimée avec succès');
      this.loadSpecialties(); // Actualise les données
    }
  }

  /**
   * Applique un filtre sur le tableau
   * @param event - Événement de saisie
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    // Réinitialise la pagination
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Affiche une notification temporaire
   * @param message - Message à afficher
   */
  private showNotification(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000, // Durée d'affichage (3 secondes)
      panelClass: ['success-snackbar'] // Classe CSS personnalisée
    });
  }
}