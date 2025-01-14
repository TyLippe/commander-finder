import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private apiUrl = 'https://api.scryfall.com';

  constructor(private httpClient: HttpClient) {}

  getCommanders(next_page: string | null = null): Observable<any> {
    const headers = { 'User-Agent': 'CommanderCollector/1.0' };
    return this.httpClient.get(
      next_page ? next_page : this.apiUrl + '/cards/search?q=is%3Acommander',
      {
        headers,
      }
    );
  }

  getCardSets(): Observable<any> {
    const headers = { 'User-Agent': 'CommanderCollector/1.0' };
    return this.httpClient.get(this.apiUrl + '/sets', {
      headers,
    });
  }
}
