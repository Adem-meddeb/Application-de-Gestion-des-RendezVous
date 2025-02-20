import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthRequest, UserResponse } from '../../Auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user', JSON.stringify(response));
      })
    );
  }



  /*
  // Login
  login(authRequest: AuthRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/login`, authRequest);
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ user: any; token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('current_user', JSON.stringify(response.user));
        this.router.navigate(['/utilisateurs']);
      }),
      catchError(error => {
        let errorMessage = 'Une erreur est survenue';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erreur: ${error.error.message}`;
        } else {
          switch(error.status) {
            case 403:
              errorMessage = 'Compte non approuvé';
              break;
            case 401:
              errorMessage = 'Identifiants incorrects';
              break;
          }
        }
        return of({ error: errorMessage });
      })
    );
  }*/
}