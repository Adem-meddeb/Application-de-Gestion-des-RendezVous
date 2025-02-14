// Import des modules Angular nécessaires
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import L from 'leaflet'; // Bibliothèque de cartographie
import { User } from '../User.model';

@Component({
  selector: 'app-edit-user',
  standalone: false,
  templateUrl: './edit-user.component.html', // Template HTML associé
  styleUrl: './edit-user.component.css' // Feuille de style CSS
})
export class EditUserComponent implements AfterViewInit, OnDestroy {
  // Variables d'état du composant
  rejectionReason: string = ''; // Raison de rejet de l'utilisateur
  currentYear = new Date().getFullYear(); // Année courante pour les validations
  private map!: L.Map; // Instance de la carte Leaflet
  @ViewChild('fileInput') fileInput!: ElementRef; // Référence au champ de fichier
  showPassword: boolean = false; // Contrôle l'affichage du mot de passe

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>, // Référence à la boîte de dialogue
    @Inject(MAT_DIALOG_DATA) public data: { user: User }, // Données injectées
    private dialog: MatDialog // Service de boîtes de dialogue
  ) { }

  // Hook après initialisation de la vue
  ngAfterViewInit() {
    if (this.data.user?.cabinet) {
      this.initMap(); // Initialise la carte si coordonnées existantes
    }
  }

  /**
   * Initialise la carte Leaflet avec les coordonnées du cabinet
   */
  private initMap() {
    const coords = this.data.user.cabinet;
    // Crée la carte avec vue centrée sur les coordonnées
    this.map = L.map('map-container').setView([coords.latitude, coords.longitude], 15);

    // Ajoute la couche de tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Ajoute un marqueur à l'emplacement du cabinet
    L.marker([coords.latitude, coords.longitude])
      .addTo(this.map)
      .bindPopup(coords.address); // Info-bulle avec l'adresse
  }

  // Hook de destruction du composant
  ngOnDestroy() {
    if (this.map) {
      this.map.remove(); // Nettoie la carte pour éviter les fuites mémoire
    }
  }

  /**
   * Met à jour le statut de l'utilisateur
   * @param newStatus Nouveau statut à appliquer
   */
  updateStatus(newStatus: string): void {
    this.data.user.Status = newStatus;
    if (newStatus !== 'rejected') {
      this.rejectionReason = ''; // Réinitialise la raison si statut changé
    }
  }

  /**
   * Sauvegarde les modifications et ferme la boîte de dialogue
   */
  saveChanges(): void {
    // Validation de la raison de rejet
    if (this.data.user.Status === 'rejected' && !this.rejectionReason) {
      alert('Veuillez saisir la raison du rejet');
      return;
    }
    
    this.data.user.rejectionReason = this.rejectionReason;
    this.dialogRef.close(this.data.user); // Retourne les données modifiées
  }

  // Getter pour accéder à l'utilisateur
  get doctor() {
    return this.data.user;
  }

  /**
   * Génère l'URL de la carte statique Google Maps
   * @returns URL de l'image de la carte
   */
  getStaticMapUrl(): string {
    if (!this.data.user?.cabinet) return '';
    const lat = this.data.user.cabinet.latitude;
    const lng = this.data.user.cabinet.longitude;
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=400x200&markers=color:red%7C${lat},${lng}&key=VOTRE_CLE_API`;
  }

  /**
   * Ouvre Google Maps dans un nouvel onglet
   */
  openGoogleMaps(): void {
    const coords = this.data.user.cabinet;
    window.open(`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`);
  }

  /**
   * Ouvre une boîte de dialogue d'affichage d'image
   * @param imageUrl URL de l'image à afficher
   */
  openImageDialog(imageUrl: string): void {
    this.dialog.open(ImageDialogComponent, {
      data: { imageUrl },
      panelClass: 'image-dialog-container', // Classe CSS personnalisée
      maxWidth: '90vw', // Taille maximale
      maxHeight: '90vh'
    });
  }
}