import { HttpInterceptorFn } from '@angular/common/http';

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthServiceService } from '../Services/AuthService/auth-service.service';
import { Router } from '@angular/router';

@Injectable()
export class authInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Ajout du token JWT dans les en-têtes
    const token = this.authService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Gestion des erreurs d'authentification
        if (error.status === 401 || error.status === 403) {
          this.authService.logout();
          this.router.navigate(['/login'], {
            queryParams: { sessionExpired: true }
          });
        }
        return throwError(() => error);
      })
    );
  }
}