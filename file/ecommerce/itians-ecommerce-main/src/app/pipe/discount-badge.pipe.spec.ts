

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountBadge',
})
export class DiscountBadgePipe implements PipeTransform {
  transform(price: number, discountPercentage: number): string {
    const discountedPrice = price - (price * discountPercentage) / 100;
    return `${discountedPrice.toFixed(2)} (-${discountPercentage}%)`;
  }
}
