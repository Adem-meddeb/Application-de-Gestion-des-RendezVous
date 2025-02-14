import { Component } from '@angular/core';
import { Specialty } from '../specialty.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-speciality',
  standalone: false,
  templateUrl: './add-speciality.component.html',
  styleUrl: './add-speciality.component.css'
})
export class AddSpecialityComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddSpecialityComponent>
  ) {
    this.form = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-ZÀ-ÿ\s\-']+$/)
      ]],
      description: ['', [
        Validators.maxLength(200),
        Validators.pattern(/^[a-zA-ZÀ-ÿ0-9\s\-\.,'()]+$/)
      ]]
    });
  }

  submit(): void {
    if (this.form.valid) {
      const newSpecialty: Specialty = {
        id: 0, // Généré par le service
        name: this.form.value.name.trim(),
        description: this.form.value.description?.trim(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.dialogRef.close(newSpecialty);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  // Getters pour accéder facilement aux contrôles du formulaire
  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  // Messages d'erreur
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