// Import des composants Angular nécessaires
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-side-bar', // Sélecteur CSS du composant
  standalone: false, // Indique que ce n'est pas un composant standalone (Angular 17+)
  templateUrl: './side-bar.component.html', // Template externe
  styleUrl: './side-bar.component.css', // Fichier de styles associé
  template: ` <!-- Template inline (remplacé par templateUrl) -->
    <mat-sidenav-container>
      <!-- Votre contenu -->
    </mat-sidenav-container>
  `,
})
export class SideBarComponent implements OnInit, OnDestroy {
  // Configuration responsive
  mobileTopGap = 56; // Espacement pour la toolbar mobile (typiquement 56px = hauteur Material toolbar)
  isMobile = false; // État de détection mobile/desktop
  
  // Gestion des abonnements RxJS
  private breakpointSubscription!: Subscription;
  
  // Compteur de notifications non lues
  unreadNotifications = 0;

  constructor(
    private router: Router, // Service de navigation
    private breakpointObserver: BreakpointObserver // Service de détection de breakpoints
  ) {}

  /**
   * Hook d'initialisation du composant
   */
  ngOnInit(): void {
    // Abonnement aux changements de breakpoints
    this.breakpointSubscription = this.breakpointObserver
      .observe([
        Breakpoints.HandsetPortrait, // Smartphone en portrait
        Breakpoints.TabletPortrait // Tablette en portrait
      ])
      .subscribe((result: BreakpointState) => {
        this.isMobile = result.matches; // Mise à jour de l'état responsive
      });
  }

  /**
   * Hook de nettoyage du composant
   */
  ngOnDestroy(): void {
    // Désabonnement pour éviter les memory leaks
    this.breakpointSubscription?.unsubscribe();
  }

  /**
   * Navigation vers la page des utilisateurs
   */
  ToUsers() {
    this.router.navigate(['/utilisateurs']); // Utilisation du service Router
  }

  /**
   * Déconnexion de l'utilisateur
   */
  logout() {
    localStorage.removeItem('token'); // Suppression du token d'authentification
    this.router.navigate(['/login']); // Redirection vers la page de login
  }
}