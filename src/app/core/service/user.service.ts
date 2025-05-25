import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { User } from '../model/user';

class CustomError extends Error {
  constructor(public errorCode: number, message: string) {
    super(message);
    this.name = 'CustomError';
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.apiURL}/users`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUserDetailById(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.apiURL}/users/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    const customError = new CustomError(
      error.status,
      error.error?.message || error.message || 'An unknown error occurred'
    );
    console.error(customError);
    return throwError(() => customError);
  }
}
