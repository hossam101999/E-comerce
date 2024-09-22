import { Component, OnInit } from '@angular/core';
import { CategoryNavigationComponent } from '../category-navigation/category-navigation.component';
import { ProductGridComponent } from '../product-grid/product-grid.component';
import { HomeProductService } from '../service/home-product.service';

@Component({
  selector: 'app-trending-products',
  standalone: true,
  imports: [CategoryNavigationComponent, ProductGridComponent],
templateUrl: './trending-products.component.html',
  styleUrls: ['./trending-products.component.css']
})
export class TrendingProductsComponent implements OnInit {
  productsByCategory: any;
  productsWithHighDiscount: any;
  allKElements: any[] = [];
  products:any=[]

  constructor(private homeService: HomeProductService) {}

  ngOnInit() {
    this.homeService.getProducts().subscribe((data) => {
      this.productsByCategory = data.productsByCategory;
      this.productsWithHighDiscount = data.productsWithHighDiscount;
      this.products=this.productsWithHighDiscount;
      this.allKElements = this.productsByCategory
      .map((item:any) => Object.keys(item)[0])

    });
  }

  onCategorySelected(category: string) {
    const categoryData = this.productsByCategory.find((item: any) => Object.keys(item)[0] === category);
    if (categoryData) {
      this.products = categoryData[category];
    }
  }

}
