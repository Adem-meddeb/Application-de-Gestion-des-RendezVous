import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-side-bar',
  standalone: false,
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
  template: `
    <mat-sidenav-container>
      <!-- Votre contenu -->
    </mat-sidenav-container>
  `,
})
export class SideBarComponent {
  mobileTopGap = 56; // Hauteur de la toolbar (ajuster selon votre CSS)
  isMobile = false;
  private breakpointSubscription!: Subscription;
  unreadNotifications = 0;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver // Correction du nom du service
  ) {}


    ngOnInit(): void {
      // Correction : Utilisation correcte de .observe() avec retour Observable
      this.breakpointSubscription = this.breakpointObserver
  .observe([Breakpoints.HandsetPortrait, Breakpoints.TabletPortrait])
  .subscribe((result: BreakpointState) => {
    this.isMobile = result.matches;
  });
    }

    ngOnDestroy(): void {
      this.breakpointSubscription?.unsubscribe();
    }
    

ToUsers(){
  this.router.navigate(['/utilisateurs']);
}

logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/login']);
}

}

