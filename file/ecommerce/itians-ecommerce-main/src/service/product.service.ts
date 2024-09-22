import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://e-commerce-api-fawn.vercel.app/product';
  constructor(private http: HttpClient) { }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  addReview(review: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/addReview`, review);
  }

}
