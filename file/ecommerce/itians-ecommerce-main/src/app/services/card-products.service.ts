import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardProductsService {

  private products: any[] = [];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return of(this.products);
  }

  setProducts(items: any) {
    this.products = items;
  }
}
