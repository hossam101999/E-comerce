import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageService } from '../service/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://e-commerce-api-fawn.vercel.app';
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(private http: HttpClient, private router: Router,private localStorageService:LocalStorageService) {
    this.checkAuthStatus();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        this.handleAuthentication(response.token, response.user);
      }),
      catchError(this.handleError)
    );
  }

  register(userData: { email: string; password: string; name: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, userData).pipe(
      tap((response) => {
        this.handleAuthentication(response.token, response.user);
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  forgotPassword(emailData: { email: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgetPassword`, emailData).pipe(
      tap(() => console.log('Sending forgot password request:', emailData)),
      catchError((error) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.status === 404) {
          errorMessage = 'This email does not exist in our database.';
        } else if (error.status === 400) {
          errorMessage = 'Bad request. Please check the email entered.';
        } else if (error.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  resetPassword(data: {
    token: string;
    email: string;
    newPassword: string;
    confirmPassword: string;
  }): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>(`${this.apiUrl}/resetPassword`, data)
      .pipe(catchError(this.handleError));
  }

  toggleFavourite(productId: string): Observable<{ message: string; favourites: any[] }> {
    const token = localStorage.getItem('token');

    if (!token) {
      return throwError(() => new Error('No token provided'));
    }

    const headers = { Authorization: token };

    return this.http.post<{ message: string; favourites: any[] }>(
      `${this.apiUrl}/favourite/${productId}`,
      {},
      { headers }
    );
  }

  getFavoriteProducts(productIds: string[]): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/products`, { ids: productIds });
  }

  private handleAuthentication(token: string, user: object): void {
    this.localStorageService.setItem('user', user);
    localStorage.setItem('token', `Bearer ${token}`);
    this.isAuthenticated.next(true);
    this.router.navigate(['/']);
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 409:
          errorMessage = 'The email address you have entered already exists.';
          break;
        case 404:
          errorMessage = 'This email does not exist in our records.';
          break;
        case 400:
          errorMessage = 'Bad request. Please check the data you have entered.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please check your credentials.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = `Error: ${error.message}`;
          break;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
