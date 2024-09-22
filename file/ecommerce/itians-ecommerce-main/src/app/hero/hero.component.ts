import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'] 
})
export class HeroComponent {
  constructor(private router: Router) { }

  navigateToProduct() {
    this.router.navigate(['/product']);
  }
}
