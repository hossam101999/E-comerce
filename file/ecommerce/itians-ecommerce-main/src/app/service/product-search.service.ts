import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  _id: string;
  title: string;
  price: number;
  categoryID: {
    _id: string;
    name: string;
  };
  brand: string;
  stock: number;
  rating: number;
  discountPercentage?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {
  private apiUrl = 'https://e-commerce-api-fawn.vercel.app/search'; 

  constructor(private http: HttpClient) { }

  searchProducts(
    category?: string,
    minPrice?: number,
    maxPrice?: number,
   
    sale?: boolean
  ): Observable<any> {
    let params = new HttpParams();
    
    if (category) {
      params = params.set('category', category);
    }
    if (minPrice !== undefined) {
      params = params.set('minPrice', minPrice);
    }
    if (maxPrice !== undefined) {
      params = params.set('maxPrice', maxPrice);
    }
   
    if (sale !== undefined) {
      params = params.set('sale', sale);
    }
  
    return this.http.get<any>(this.apiUrl, { params });
  }
}
