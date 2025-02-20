// Import des modules Angular nécessaires
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/AuthService/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login', // Sélecteur HTML pour utiliser ce composant
  standalone: false, // Composant traditionnel (non standalone)
  templateUrl: './login.component.html', // Template associé
  styleUrl: './login.component.css' // Feuille de style CSS
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  submitted = false;
  interval: any;
  year: number = new Date().getFullYear();
  // Décommenter et modifier les propriétés
  errorMessage: string | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialisation du formulaire avec validation
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required, // Champ obligatoire
        Validators.email // Format email valide
      ]],
      password: ['', [
        Validators.required, // Champ obligatoire
        Validators.minLength(8) // Longueur minimale (exemple)
      ]]
    });
  }

  // Modifier onSubmit()
  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = null;
  
    if (this.loginForm.invalid) {
      return;
    }
  
    this.isLoading = true; // Activate loading state
  
    const { email, password } = this.loginForm.value;
  
    this.authService.login(email, password).subscribe({
      next: (userResponse) => {
        // Store the token and user information in localStorage
        localStorage.setItem('token', userResponse.token);
        localStorage.setItem('user', JSON.stringify(userResponse));
  
        if (userResponse.role === 'ROLE_ADMIN') {
          this.router.navigate(['/utilisateurs']);
        } else {
          this.errorMessage = 'Accès réservé aux administrateurs';
        }
        this.isLoading = false; // Disable loading state
      },
      error: (err) => {
        this.errorMessage = this.getErrorMessage(err);
        this.isLoading = false; // Disable loading state on error
      },
      complete: () => this.isLoading = false
    });
  }
  

  // Ajouter la gestion des messages d'erreur
  private getErrorMessage(error: any): string {
    if (error.status === 401) {
      return 'Identifiants incorrects';
    }
    if (error.error?.message === 'Account not approved') {
      return 'Compte en attente de validation';
    }
    return 'Une erreur est survenue lors de la connexion';
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    // Nettoyage des ressources
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  get f() {
    return this.loginForm.controls;
  }
}