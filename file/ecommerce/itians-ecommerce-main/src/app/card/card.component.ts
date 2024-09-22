import { AuthService } from './../services/auth.service';
import { LocalStorageService } from './../service/local-storage.service';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DiscountBadgePipe } from '../pipe/discount-badge.pipe';
import { DiscountPipe } from '../pipe/discount.pipe';
import { CartListService } from '../service/cart-list.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, NgStyle, NgIf, DiscountBadgePipe, DiscountPipe,RouterLink],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() product: any;
  favoriteProducts: any[] = [];
  cartProducts: any[] = [];
  removeFavorite:boolean=false
  constructor(private authService: AuthService , private cartListService:CartListService,private localStorageService:LocalStorageService ) {}

  ngOnInit(): void {
    this.loadFavoriteProducts();
    this.loadCartProducts();
    this.removeFavoriteIcon()
  }
  removeFavoriteIcon(){
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.removeFavorite=true
      }else{
        this.removeFavorite=false
      }
    })  
 
  }
  loadFavoriteProducts(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.favourite) {
      this.favoriteProducts = user.favourite;
    }
  }

  loadCartProducts(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.cart) {
      this.cartProducts = user.cart;
    }
  }

  isFavorite(): boolean {
    return this.favoriteProducts.some((fav) => fav._id === this.product._id);
  }

  toggleFavorite(id:string): void {

    this.authService.toggleFavourite(id).subscribe({
      next: (response) => {
        this.favoriteProducts = response.favourites;
        this.localStorageService.setItem('user', {
          ...JSON.parse(localStorage.getItem('user') || '{}'),
          favourite: response.favourites,
        });
      },
      error: (err) => console.error('Error toggling favorite:', err),
    });
  }

  getIconClass(): string {
    return this.isFavorite() ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
  }

  addToCart(product: any): void {
    this.cartListService.addToCart(product,1)

  }
}
