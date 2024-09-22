// <product-ProductCardComponent.ts
import { Component, Input } from '@angular/core';
// import { Product } from '../product.model';
import { CommonModule, NgClass } from '@angular/common';
import { Router } from '@angular/router';
// import { DiscountPricePipe } from '../discount-price.pipe';
import { CartService } from '../../service/cart.service';
import { ProductService } from '../../service/product.service';
// import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: any;
  quantity: number = 1;

  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  getStars(rating: number): { full: number; half: boolean } {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    return { full: fullStars, half: halfStar };
  }

  getStockInfo(): { status: string; statusClass: string } {
    if (this.product.stock >= 0) {
      return { status: 'Available', statusClass: 'in-stock' };
    } else {
      return { status: 'Out of Stock', statusClass: 'out-of-stock' };
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addProduct(this.product, this.quantity);
    }
  }

  onSelectProduct(): void {
    this.router.navigate(['/product', this.product.id]);
  }
 
}

