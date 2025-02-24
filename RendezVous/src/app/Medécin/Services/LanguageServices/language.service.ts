import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  getSupportedLanguages() {
    const headers = new HttpHeaders()
      .set('Accept-Language', 'fr'); // Pour obtenir les noms en français

    return this.http.get<any>(
      'https://api.cognitive.microsofttranslator.com/languages?api-version=3.0',
      { headers }
    );
  }
}
