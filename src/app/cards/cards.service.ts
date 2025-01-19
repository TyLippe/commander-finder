import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private apiUrl = environment.apiUrl;
  private filtersSubject = new BehaviorSubject<any>({});
  filters$ = this.filtersSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  setFilters(filters: any): void {
    this.filtersSubject.next(filters);
  }

  getCardSets(): Observable<any> {
    const headers = { 'User-Agent': 'CommanderCollector/1.0' };
    return this.httpClient.get(this.apiUrl + '/sets', {
      headers,
    });
  }

  getCommanders(next_page: string | null = null): Observable<any> {
    try {
      return this.httpClient.post(this.apiUrl + '/commanders', {
        next_page: next_page ? next_page : null,
      });
    } catch (error) {
      console.error('Error fetching commanders:', error);
      return new Observable((observer) => {
        observer.next([]);
        observer.complete();
      });
    }
  }

  getFilteredCommanders(
    filters: any,
    next_page: string | null = null
  ): Observable<any> {
    let filterString = 'is:commander';
    if (filters.colors.length) {
      filterString += ' color:' + filters.colors.join(' color:');
    }
    if (filters.max_cost) {
      filterString += ' cmc<=' + filters.max_cost;
    }
    if (filters.set) {
      filterString += ' set=' + filters.set;
    }

    return this.httpClient
      .post(this.apiUrl + '/commanders/filter', {
        next_page: next_page ? next_page : null,
        filterString,
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
