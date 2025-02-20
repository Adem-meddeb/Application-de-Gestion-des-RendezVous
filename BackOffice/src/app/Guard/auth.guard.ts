import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class authGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userJson = localStorage.getItem('user'); // Change 'currentUser' to 'user'

    
    if (!userJson) {
      this.router.navigate(['/login']);
      return false;
    }
    
    try {
      const user = JSON.parse(userJson);
      return !!user?.id;
      
    } catch (e) {
      return false;
    }
  }
}