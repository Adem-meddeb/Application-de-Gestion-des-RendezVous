import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import L from 'leaflet';
import { User } from '../User.model';

@Component({
  selector: 'app-edit-user',
  standalone: false,
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements AfterViewInit, OnDestroy {
  rejectionReason: string = '';
  currentYear = new Date().getFullYear();
  private map!: L.Map;
  @ViewChild('fileInput') fileInput!: ElementRef;
  showPassword: boolean = false; // Ajout de cette variable

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
        private dialog: MatDialog // <-- Ajoutez cette injection

  ) {

   }

   ngAfterViewInit() {
    if (this.data.user?.cabinet) {
      this.initMap();
    }
  }

  private initMap() {
    const coords = this.data.user.cabinet;
    this.map = L.map('map-container').setView([coords.latitude, coords.longitude], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([coords.latitude, coords.longitude])
      .addTo(this.map)
      .bindPopup(coords.address);
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  updateStatus(newStatus: string): void {
    this.data.user.Status = newStatus;
    if (newStatus !== 'rejected') {
      this.rejectionReason = ''; // Réinitialiser la raison si le statut change
    }
  }

  saveChanges(): void {
    if (this.data.user.Status === 'rejected' && !this.rejectionReason) {
      alert('Veuillez saisir la raison du rejet');
      return;
    }
    
    this.data.user.rejectionReason = this.rejectionReason;
    this.dialogRef.close(this.data.user);
  }

  

 

  // Remplacer la propriété @Input() doctor par :
  get doctor() {
    return this.data.user; // Accès aux données via data.user
  }

  // Corriger les méthodes pour utiliser this.data.user
  getStaticMapUrl(): string {
    if (!this.data.user?.cabinet) return '';
    const lat = this.data.user.cabinet.latitude;
    const lng = this.data.user.cabinet.longitude;
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=400x200&markers=color:red%7C${lat},${lng}&key=VOTRE_CLE_API`;
  }

  openGoogleMaps(): void {
    const coords = this.data.user.cabinet;
    window.open(`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`);
  }

  // Ajoutez cette fonction
  openImageDialog(imageUrl: string): void {
    this.dialog.open(ImageDialogComponent, {
      data: { imageUrl },
      panelClass: 'image-dialog-container',
      maxWidth: '90vw',
      maxHeight: '90vh'
    });
  }
}