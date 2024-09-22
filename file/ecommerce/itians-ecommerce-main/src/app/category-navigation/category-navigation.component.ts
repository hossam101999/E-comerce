import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-navigation.component.html',
  styleUrl: './category-navigation.component.css'
})
export class CategoryNavigationComponent {
  @Input() categories: any[] = [];

OnInit(){
  
}

  @Output() categorySelected = new EventEmitter<string>();

  onCategorySelect(category: string) {

    this.categorySelected.emit(category);
  }
}
