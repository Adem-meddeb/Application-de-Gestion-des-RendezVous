// Import des modules Angular nécessaires
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Composant de gestion de l'authentification utilisateur
 * Responsabilités :
 * - Affichage du formulaire de connexion
 * - Validation des entrées utilisateur
 * - Gestion de la soumission des données
 */
@Component({
  selector: 'app-login', // Sélecteur HTML pour utiliser ce composant
  standalone: false, // Composant traditionnel (non standalone)
  templateUrl: './login.component.html', // Template associé
  styleUrl: './login.component.css' // Feuille de style CSS
})
export class LoginComponent implements OnInit, OnDestroy {
  // Formulaire réactif pour la connexion
  loginForm: FormGroup;

  // État de soumission du formulaire
  submitted = false;

  // Gestion des intervalles (ex: pour les animations)
  interval: any;

  // Année courante pour le copyright
  year: number = new Date().getFullYear();

  // Injection des dépendances
  constructor(
    private fb: FormBuilder // Service de construction de formulaire
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

  /**
   * Méthode appelée à la soumission du formulaire
   */
  onSubmit(): void {
    this.submitted = true;

    // Arrête l'exécution si le formulaire est invalide
    if (this.loginForm.invalid) {
      return;
    }

    // Structure pour l'appel au service d'authentification (à décommenter)
    /*
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        // Redirection après connexion réussie
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        // Gestion des erreurs
        console.error('Erreur de connexion:', err);
        this.errorMessage = 'Identifiants incorrects';
      }
    });
    */
  }

  /**
   * Hook du cycle de vie - Initialisation du composant
   */
  ngOnInit(): void {
    // Peut être utilisé pour :
    // - Initialisations supplémentaires
    // - Appels API préliminaires
  }

  /**
   * Hook du cycle de vie - Destruction du composant
   */
  ngOnDestroy(): void {
    // Nettoyage des ressources
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  // Helper pour accéder facilement aux contrôles du formulaire
  get f() { 
    return this.loginForm.controls; 
  }

  // Exemple de propriété supplémentaire pour la gestion des erreurs
  /* 
  errorMessage: string | null = null;
  
  // Exemple de propriété pour le loading state
  isLoading = false;
  */
}