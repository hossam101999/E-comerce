import { Component, OnInit } from '@angular/core';
import { ImageCompleteComponent } from "./image-complete/image-complete.component";
import { SummaryComponent } from "./summary/summary.component";
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-order-complete',
  standalone: true,
  imports: [ImageCompleteComponent, SummaryComponent],
  templateUrl: './order-complete.component.html',
  styleUrl: './order-complete.component.css'
})
export class OrderCompleteComponent {
  constructor(private localStorageService:LocalStorageService){}
  OnInit(){
    this.localStorageService.removeItem("cart")

  }

}
