import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private apiUrl = 'https://api.scryfall.com';
  private filtersSubject = new BehaviorSubject<any>({});
  filters$ = this.filtersSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  getCommanders(next_page: string | null = null): Observable<any> {
    const headers = { 'User-Agent': 'CommanderCollector/1.0' };
    const params = { q: 'is:commander' };

    try {
      return this.httpClient.get(
        next_page ? next_page : this.apiUrl + '/cards/search',
        {
          headers,
          params,
        }
      );
    } catch (error) {
      console.error('Error fetching commanders:', error);
      return new Observable((observer) => {
        observer.next([]);
        observer.complete();
      });
    }
  }

  getCardSets(): Observable<any> {
    const headers = { 'User-Agent': 'CommanderCollector/1.0' };
    return this.httpClient.get(this.apiUrl + '/sets', {
      headers,
    });
  }

  setFilters(filters: any): void {
    this.filtersSubject.next(filters);
  }

  getFilteredCommanders(
    filters: any,
    next_page: string | null = null
  ): Observable<any> {
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

    return this.httpClient
      .get(next_page ? next_page : this.apiUrl + '/cards/search', {
        headers,
        params: { q: query },
      })
      .pipe(
        catchError((error) => {
          if (error.status === 404) {
            return of([]);
          } else {
            return throwError(error);
          }
        })
      );
  }
}
