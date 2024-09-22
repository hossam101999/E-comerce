import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeProductService {
  private apiUrl = 'https://e-commerce-api-fawn.vercel.app/product';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

}
