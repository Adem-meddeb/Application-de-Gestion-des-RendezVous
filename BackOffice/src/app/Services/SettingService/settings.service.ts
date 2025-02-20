import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private apiUrl = '/api/settings';

  constructor(private http: HttpClient) {}

  getSettings(): Observable<AppSettings> {
    return this.http.get<AppSettings>(this.apiUrl);
  }

  updateSettings(settings: AppSettings): Observable<void> {
    return this.http.patch<void>(this.apiUrl, settings);
  }
}
