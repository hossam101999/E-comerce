import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userKey = 'user';
  private apiUrl = 'https://e-commerce-api-fawn.vercel.app/updateProfile';

  constructor(private http: HttpClient) { }


  getUserData(): any {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }


  setUserData(data: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(data));
  }


  updateUserData(data: any): Observable<any> {

    return this.http.patch('https://e-commerce-api-fawn.vercel.app/updateProfile', data, {
      headers: {
        'Authorization': `${this.getToken()}`,

      }
    });
  }

}
