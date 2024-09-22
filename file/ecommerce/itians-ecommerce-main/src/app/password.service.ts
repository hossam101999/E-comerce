import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private apiUrl = 'https://e-commerce-api-fawn.vercel.app/changePassword';

  constructor(private http: HttpClient) { }

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  changePassword(currentPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    const body = {
      currentPassword:currentPassword,
      newPassword:newPassword,
      confirmPassword:confirmPassword
    };

    return this.http.patch(this.apiUrl, body, { headers });
  }
}
