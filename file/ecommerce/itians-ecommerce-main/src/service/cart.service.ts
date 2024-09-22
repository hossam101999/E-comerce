import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<Product[]>(this.getCartFromLocalStorage());
  cartItems$ = this.cartItemsSubject.asObservable();

  private getCartFromLocalStorage(): Product[] {
    const cartData = localStorage.getItem('cartItems');
    return cartData ? JSON.parse(cartData) : [];
  }

  private saveCartToLocalStorage(cartItems: Product[]): void {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  addProduct(product: Product, quantity: number): void {
    const currentCartItems = this.cartItemsSubject.value;
    const existingProductIndex = currentCartItems.findIndex(item => item._id === product._id);

    if (existingProductIndex !== -1) {
      currentCartItems[existingProductIndex].stock += quantity;
    } else {
      currentCartItems.push({ ...product, stock: quantity });
    }

    this.cartItemsSubject.next(currentCartItems);
    this.saveCartToLocalStorage(currentCartItems);
  }

  removeProduct(productId: string): void {
    const currentCartItems = this.cartItemsSubject.value.filter(item => item._id !== productId);
    this.cartItemsSubject.next(currentCartItems);
    this.saveCartToLocalStorage(currentCartItems);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cartItems');
  }
}
