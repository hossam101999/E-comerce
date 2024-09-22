import { Component, Input } from '@angular/core';
import { ProductSearchService } from '../../service/product-search.service';
import { CardComponent } from '../../card/card.component';
import { NgFor,NgIf } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoaderComponent } from "../../loader/loader.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CardComponent, NgFor, NgxPaginationModule, LoaderComponent,NgIf],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  @Input()  products:any[] = [];
  p: number = 1;
  get noData(): boolean {
    return this.products.length === 0;
  }
  
  onPageChange(page: number) {
    this.p = page;
  }
}
