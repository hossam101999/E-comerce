import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DiscountPipe } from '../pipe/discount.pipe';
import { DiscountBadgePipe } from '../pipe/discount-badge.pipe';
import { CardComponent } from "../card/card.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, DiscountPipe, DiscountBadgePipe, CardComponent,RouterLink],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.css'
})
export class ProductGridComponent {
  @Input() products: any[] = [];
  favorites: Set<string> = new Set();

  toggleFavorite(product: any) {
    if (this.isFavorite(product)) {
      this.favorites.delete(product.id);
    } else {
      this.favorites.add(product.id);
    }
  }

  isFavorite(product: any): boolean {
    return this.favorites.has(product.id);
  }

  getIconClass(product: any): string {
    return this.isFavorite(product) ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
  }

}
