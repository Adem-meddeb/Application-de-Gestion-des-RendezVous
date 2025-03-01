import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  UrlTree, 
  Router 
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../Services/AuthService/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Récupération du rôle requis depuis les données de la route
    const requiredRole = next.data['role'];
    const currentUser = this.authService.getCurrentUser();

    if (this.authService.isLoggedIn()) {
      // Vérification du rôle si nécessaire
      if (requiredRole && currentUser?.role !== requiredRole) {
        this.router.navigate(['/unauthorized']);
        return false;
      }
      return true;
    }

    // Redirection vers la page de login avec l'URL de retour
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}