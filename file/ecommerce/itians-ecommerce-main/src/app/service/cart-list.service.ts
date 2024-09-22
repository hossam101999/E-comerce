import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartListService {
  private cart: any[] = [];
  private apiUrl = 'https://e-commerce-api-fawn.vercel.app/cart';

  constructor(
    private http: HttpClient, 
    private authService: AuthService, 
    private localStorageService: LocalStorageService
  ) {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.mergeLocalCartWithServer();
      } else {
        this.cart = this.localStorageService.getItem('cart') || [];
      }
    });
  }

  isLogin():boolean{
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        return true
      }else{
        return false
      }})
      return false
  }
  getCart(): any {
    return this.localStorageService.getItem('cart');
  }

  addToCart(item: any, quantityNum: number): void {
      if (this.isLogin()) {

        const getToken = localStorage.getItem('token') || '';
        const headers = new HttpHeaders({
          'Authorization': `${getToken}`
        });
        this.http.post(`${this.apiUrl}/${item._id}`, { quantity: quantityNum }, { headers }).subscribe(
          response => {
            this.localStorageService.updateQuantityInArray('cart', item._id, quantityNum, item);
          },
          error => {
            console.error('Error adding item to cart:', error);
          }
        );
      } else {
        this.localStorageService.updateQuantityInArray('cart', item._id, quantityNum, item);
      }
  }

  removeFromCart(item: any): void {
      if (this.isLogin()) {
        const getToken = localStorage.getItem('token') || '';
        const headers = new HttpHeaders({
          'Authorization': `${getToken}`
        });
        this.http.delete(`${this.apiUrl}/${item._id}`, { headers }).subscribe(
          response => {
            this.localStorageService.removeItemFromArray('cart', item._id);
          },
          error => {
            console.error('Error removing item from cart:', error);
          }
        );
      } else {
        this.localStorageService.removeItemFromArray('cart', item._id);
      }
  }

  private fetchCart(): void {
      if (this.isLogin()) {
        const getToken = localStorage.getItem('token') || '';
        const headers = new HttpHeaders({
          'Authorization': `${getToken}`
        });
        this.http.get<any>(`${this.apiUrl}`, { headers }).subscribe(
          data => {
            this.cart = data.cart.map((item: any) => ({
              product: { id: item.product._id },
              productBody: item.product,
              quantity: item.quantity
            }));
            this.localStorageService.setItem('cart', this.cart);
          },
          error => {
            console.error('Error fetching cart:', error);
          }
        );
      } else {
        this.cart = this.localStorageService.getItem('cart') || [];
      }
  }

  private mergeLocalCartWithServer(): void {
    const storedCart: any = this.localStorageService.getItem('cart');
    if (storedCart) {
      const sendArray = storedCart.map((item: any) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));
  
      const getToken = localStorage.getItem('token') || '';
      const headers = new HttpHeaders({
        'Authorization': `${getToken}`
      });
  
      this.http.post<any>(`${this.apiUrl}`, { cartItems: sendArray }, { headers }).subscribe(
        data => {
          this.cart = data.cart.map((item: any) => ({
            product: { id: item.product._id },
            productBody: item.product,
            quantity: item.quantity
          }));
          this.localStorageService.removeItem('cart');
          this.localStorageService.setItem('cart', this.cart);
        },
        error => {
          console.error('Error merging local cart with server cart:', error);
        }
      );
    }
  }
}
