import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Specialty } from '../specialty.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SpecialtyService } from '../Services/specialty.service';
import { MatDialog } from '@angular/material/dialog';
import { AddSpecialityComponent } from '../add-speciality/add-speciality.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-specialite',
  standalone: false,
  templateUrl: './specialite.component.html',
  styleUrl: './specialite.component.css'
})
export class SpecialiteComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource!: MatTableDataSource<Specialty>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private specialtyService: SpecialtyService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.specialtyService.getSpecialties().subscribe(specialties => {
      this.dataSource = new MatTableDataSource(specialties);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddSpecialityComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.specialtyService.addSpecialty(result);
        this.showNotification('Spécialité ajoutée avec succès');
      }
    });
  }

  deleteSpecialty(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette spécialité ?')) {
      this.specialtyService.deleteSpecialty(id);
      this.showNotification('Spécialité supprimée avec succès');
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private showNotification(message: string): void {
    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
}
