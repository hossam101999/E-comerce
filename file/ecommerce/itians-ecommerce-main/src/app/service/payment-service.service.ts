import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  private apiUrl = 'https://e-commerce-api-fawn.vercel.app/api/payment'; 

  constructor(private http: HttpClient) { }

  startCheckout(items: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/checkout`, items);
  }
}
