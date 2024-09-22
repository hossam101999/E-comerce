import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiscountBadgePipe } from '../pipe/discount-badge.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service';
import { error } from 'jquery';
import { Input } from 'hammerjs';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../service/local-storage.service';
import { CartListService } from '../service/cart-list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CommonModule, FormsModule, DiscountBadgePipe,ReviewFormComponent,NgFor ],
  templateUrl:'./productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent implements OnInit {
  product: any;
  quantity: number = 1;
  selectedImage: string = '';
  isAddedToCart = false;
  reviewsStart: number = 1;
  reviewsEnd: number = 0;
  showQuantityControls = false;
  favorites: any[] = [];
  newReviewContent: string = '';
  carts: any ;
  subscription: any;
  isAuthenticated: boolean = false;  


  constructor(
    private cartListService: CartListService,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,private authService: AuthService ,
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;  
    });
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (res: any) => {
          this.product = res.product;
          this.selectedImage = res.product.image;
        },
        error: (err: any) => {
          console.error('Error fetching product details:', err);
        }
      });
    } else {
      console.error('No product ID found in the route.');
    }
    
    this.subscription =this.cartListService.getCart()
    this.carts = this.subscription.find((c:any) => c.product.id === id);
    if(this.carts)this.showQuantityControls = true;
    if(this.carts)this.showQuantityControls = true;
    this.quantity= this.carts.quantity
  }
  
 
  handleReviewSubmission(newReview: any) {
    this.product=newReview.product
  }

get savedAmount(): number {
  const discount = (this.product.discountPercentage / 100) * this.product.price;
  return discount;
}
  selectImage(index: number) {
    this.selectedImage = this.product.images[index];
  }

  prevImage() {
    const currentIndex = this.product.images.indexOf(this.selectedImage);
    const prevIndex = (currentIndex === 0) ? this.product.images.length - 1 : currentIndex - 1;
    this.selectedImage = this.product.images[prevIndex];
  }
  nextImage() {
    const currentIndex = this.product.images.indexOf(this.selectedImage);
    const nextIndex = (currentIndex === this.product.images.length - 1) ? 0 : currentIndex + 1;
    this.selectedImage = this.product.images[nextIndex];
  }
  getStockStatus(): string {
    return this.product?.stock > 0 ? 'In Stock' : 'Out of Stock';
  }

  getStockStatusClass(): string {
    return this.product?.stock > 0 ? 'in-stock' : 'out-of-stock';
  }

  getStars(rating: number): { fullArray: number[], half: boolean } {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return { fullArray: Array(fullStars).fill(0), half: halfStar };
  }

  isFavorite(): boolean {
    return this.favorites.some(fav => fav._id === this.product._id);
  }


  toggleFavorite(product: any): void {
    const index = this.favorites.findIndex(fav => fav._id === product.id);
    if (index !== -1) {
      this.favorites.splice(index, 1);

    } else {
      this.favorites.push(this.product);
    }
  }

  getIconClass(): string {
    return this.isFavorite() ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
  }
  increaseQuantity(): void {
    const cartItem = this.carts
    if (cartItem && cartItem.quantity < this.product.stock) {
      cartItem.quantity++;
      this.quantity = cartItem.quantity;
      this.cartListService.addToCart(this.product,1)
    }
  }
  
  decreaseQuantity(): void {
    const cartItem = this.carts
    if (cartItem && cartItem.quantity > 1) {
    if (cartItem && cartItem.quantity < this.product.stock) {
      cartItem.quantity--;
      this.quantity = cartItem.quantity;
      this.cartListService.addToCart(this.product,-1)

    }
    } else {
      this.cartListService.addToCart(this.product,-1)
      this.cartListService.removeFromCart(this.product)
      this.showQuantityControls = false;
    }
  }
  
addToCart(): void {
  this.cartListService.addToCart(this.product,1)
  this.carts={product:{id:this.product._id},productBody:this.product,quantity:this.quantity}
  this.showQuantityControls = true;
  
}

  showMessage(message: string): void {
    const snackbar = document.getElementById("snackbar");
    if (snackbar) {
        snackbar.textContent = message;
        snackbar.className = "show";
        setTimeout(() => {
            snackbar.className = snackbar.className.replace("show", "");
        }, 2000);
    }
}

  getDiscountedPrice(): number {
    return this.product.price * (1 - this.product.discountPercentage / 100);
  }

 

  onSelectProduct(product: any): void {
    this.product = product;
    this.selectedImage = product.images[0];
    this.quantity = 1;
  }
  reviewClick() {
    if (!this.isAuthenticated) {
      
      Swal.fire({
        title: 'Error',
        text: 'Login First',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: 'red'
      });
    }
  }
  

}
