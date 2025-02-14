// Import des modules Angular nécessaires
import { Component } from '@angular/core';
import { Specialty } from '../specialty.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-speciality', // Sélecteur CSS du composant
  standalone: false, // Composant non standalone (intégré dans un module)
  templateUrl: './add-speciality.component.html', // Template HTML externe
  styleUrl: './add-speciality.component.css' // Feuille de style associée
})
export class AddSpecialityComponent {
  form: FormGroup; // Déclaration du formulaire réactif

  constructor(
    private fb: FormBuilder, // Service de création de formulaires
    private dialogRef: MatDialogRef<AddSpecialityComponent> // Référence à la boîte de dialogue
  ) {
    // Initialisation du formulaire avec validation
    this.form = this.fb.group({
      name: ['', [
        Validators.required, // Champ obligatoire
        Validators.maxLength(50), // Longueur maximale 50 caractères
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s\-']+$/) // Autorise lettres, espaces et certains caractères spéciaux
      ]],
      description: ['', [
        Validators.maxLength(200), // Longueur maximale 200 caractères
        Validators.pattern(/^[a-zA-ZÀ-ÿ0-9\s\-\.,'()]+$/) // Autorise lettres, chiffres et ponctuation
      ]]
    });
  }

  /**
   * Soumission du formulaire
   */
  submit(): void {
    if (this.form.valid) {
      // Création d'une nouvelle spécialité
      const newSpecialty: Specialty = {
        id: 0, // Temporaire (généré par le backend)
        name: this.form.value.name.trim(), // Suppression des espaces inutiles
        description: this.form.value.description?.trim(), // Trim optionnel
        createdAt: new Date(), // Date de création
        updatedAt: new Date() // Date de mise à jour
      };
      // Fermeture de la boîte de dialogue avec les données
      this.dialogRef.close(newSpecialty);
    }
  }

  /**
   * Annulation de la création
   */
  cancel(): void {
    // Fermeture de la boîte sans données
    this.dialogRef.close();
  }

  // Accès simplifié aux contrôles du formulaire
  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  /**
   * Messages d'erreur pour le champ nom
   */
  get nameErrorMessage(): string {
    if (this.name?.hasError('required')) {
      return 'Le nom est obligatoire';
    }
    if (this.name?.hasError('maxlength')) {
      return 'Maximum 50 caractères';
    }
    if (this.name?.hasError('pattern')) {
      return 'Caractères spéciaux non autorisés';
    }
    return '';
  }

  /**
   * Messages d'erreur pour le champ description
   */
  get descriptionErrorMessage(): string {
    if (this.description?.hasError('maxlength')) {
      return 'Maximum 200 caractères';
    }
    if (this.description?.hasError('pattern')) {
      return 'Caractères spéciaux non autorisés';
    }
    return '';
  }
}