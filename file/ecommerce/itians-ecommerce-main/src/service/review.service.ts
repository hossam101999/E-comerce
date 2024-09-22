import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl ='https://e-commerce-api-fawn.vercel.app/product/review/';
  constructor(private http: HttpClient ) { }
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }


  addReview(productId: string,review: any): Observable<any> {
    console.log(productId)
    const url = `${this.apiUrl}${productId}`;
    const headers = new HttpHeaders({
      'Authorization':`${this.getToken()}`
    });
    console.log(review)

    return this.http.post<any>(url, {reviewText:review.content,rating:review.rating}, {headers});
  }
}
