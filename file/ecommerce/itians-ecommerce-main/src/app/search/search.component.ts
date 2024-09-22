import { Component } from '@angular/core';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { FilterComponent } from './filter/filter.component';
import { HeroComponent2 } from "./hero/hero.component";
import {HeroComponent as hero2} from'../hero/hero.component'
import { IconsComponent } from "../icons/icons.component";
import { ProductSearchService } from '../service/product-search.service';
import { CategoryService } from '../services/category.service';
@Component({
  selector: 'app-search',
  standalone: true,

  imports: [
    SearchHeaderComponent,
    ProductListComponent,
    FilterComponent,
    SearchHeaderComponent,
    HeroComponent2,
    hero2,
    IconsComponent
],
    templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  categories :any[]=[]
  products: any[] = [];
  category!: string ;
  minPrice!: number ;
  maxPrice!: number ;
  
  sale!: boolean ;

  constructor(private productService: ProductSearchService,private categoriy:CategoryService) { }

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategory();
  }
  fetchCategory(): void {
    this.categoriy.getCategory().subscribe(
      response => {
        this.categories = response.categories;
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

  fetchProducts(): void {
    this.productService.searchProducts(
      this.category,
      this.minPrice,
      this.maxPrice,
      
      this.sale
    ).subscribe(
      response => {
        this.products = response.products;
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

  onFilterChange(filters: any): void {
    this.category = filters.category ;
    this.minPrice = filters.minPrice 
    this.maxPrice = filters.maxPrice 
    
    this.sale = filters.sale 
    this.products=[]
    this.fetchProducts();
  }
  
}
