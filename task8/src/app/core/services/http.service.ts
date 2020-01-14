import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError = (error: HttpErrorResponse) => {
    if (error.status === 401) {
      this.router.navigate(['/login']);
    }

    return throwError(error);
  }
}
