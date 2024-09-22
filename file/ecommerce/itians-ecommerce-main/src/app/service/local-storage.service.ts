import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private storageChangeEmitter = new EventEmitter<void>();

  constructor() {
    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage) {
        this.storageChangeEmitter.emit();
      }
    });
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
    this.storageChangeEmitter.emit();
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  getStorageChanges() {
    return this.storageChangeEmitter.asObservable();
  }

  pushToArray(key: string, newItem: any): void {
    const existingArray = this.getItem<any[]>(key) || [];
    existingArray.push(newItem);
    this.setItem(key, existingArray);
  }

  updateQuantityInArray(key: string, productId: string, newQuantity: number,productBody:any): void {
    const existingArray = this.getItem<any[]>(key) || [];
  
    const itemIndex = existingArray.findIndex(item => item.product.id === productId);
  
    if (itemIndex !== -1) {
      existingArray[itemIndex].quantity += newQuantity;
    } else {
      const newItem = {
        product: { id: productId },
        productBody: productBody,
        quantity: newQuantity
      };
      existingArray.push(newItem);
    }
  
    this.setItem(key, existingArray);
  }
  removeItemFromArray(key: string, productId: string): void {
    const existingArray = this.getItem<any[]>(key) || [];
    const updatedArray = existingArray.filter(item => item.product.id !== productId);
    this.storageChangeEmitter.emit();
    this.setItem(key, updatedArray);
  }
  
}
