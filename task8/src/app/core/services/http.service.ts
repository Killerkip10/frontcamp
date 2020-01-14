import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PATH } from 'src/app/configs/path';

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

  public post<T>(url: string, body: T): Observable<T> {
    return this.http.post<T>(url, body)
      .pipe(
        catchError(this.handleError),
      );
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url)
      .pipe(
        catchError(this.handleError),
      );
  }

  private handleError = (error: HttpErrorResponse) => {
    if (error.status === 401) {
      this.router.navigate([PATH.LOGIN]);
    }

    return throwError(error);
  }
}
