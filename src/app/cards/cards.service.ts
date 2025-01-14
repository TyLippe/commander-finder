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
    const params = { q: 'is:commander' };

    return this.httpClient.get(
      next_page ? next_page : this.apiUrl + '/cards/search',
      {
        headers,
        params,
      }
    );
  }

  getCardSets(): Observable<any> {
    const headers = { 'User-Agent': 'CommanderCollector/1.0' };
    return this.httpClient.get(this.apiUrl + '/sets', {
      headers,
    });
  }

  getFilteredCommanders(filters: any): Observable<any> {
    const headers = { 'User-Agent': 'CommanderCollector/1.0' };

    let query = 'is:commander';
    if (filters.colors.length) {
      query += ' color:' + filters.colors.join(' color:');
    }
    if (filters.max_cost) {
      query += ' cmc<=' + filters.max_cost;
    }
    if (filters.set) {
      query += ' set=' + filters.set;
    }

    return this.httpClient.get(this.apiUrl + '/cards/search', {
      headers,
      params: { q: query },
    });
  }
}
