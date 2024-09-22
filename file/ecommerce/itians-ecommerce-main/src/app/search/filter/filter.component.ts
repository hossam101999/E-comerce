import { Component, OnInit ,Input, EventEmitter, Output } from '@angular/core';
import { NgxSliderModule, Options, LabelType } from '@angular-slider/ngx-slider';
import { NgClass, NgFor } from '@angular/common';
import { ProductSearchService } from '../../service/product-search.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgxSliderModule,NgClass,NgFor],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent  {
  @Output() filterChanged = new EventEmitter<any>();
@Input() categories: any[] =[]; 
  minPrice?: number;  
  maxPrice?: number;
  minPriceBarValue: number=0;  
  maxPriceBarValue: number=10000;
  selectedCategory?: string;
  selectedBrand?: string;
  selectedStock?: boolean;  
  rating?: number;
  sale?: boolean;

  optionsPrice = {
    floor: 0,
    ceil: this.maxPriceBarValue,
    translate: (value: number): string => {
      return '$' + value;
    }
  };

  constructor(private productService: ProductSearchService ) { }

 
  
  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.emitFilters();
  }
  onValueChange($event:any){
    this.minPrice = $event
    this.emitFilters();


  }
  onHighValueChange($event:any){
    this.maxPrice = $event;

  }
 

  onStockChange(sale: boolean): void {
    this.sale = sale;
    this.emitFilters();
  }

  onRatingChange(rating: number): void {
    this.rating = rating;
    this.emitFilters();
  }

  onSaleChange(sale: boolean): void {
    this.sale = sale;
    this.emitFilters();
  }

  private emitFilters(): void {
    this.filterChanged.emit({
      category: this.selectedCategory,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      sale: this.sale,
    });
  }
}
