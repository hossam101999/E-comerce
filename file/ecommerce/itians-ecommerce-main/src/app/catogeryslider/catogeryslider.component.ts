import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

interface Slide {
  image: string;
  title: string;
  items: string;
  link: string;
  category: string;
}

@Component({
  selector: 'app-catogeryslider',
  standalone: true,
  imports: [CarouselModule, NgFor],
  templateUrl: './catogeryslider.component.html',
  styleUrls: ['./catogeryslider.component.css']  
})
export class CatogerysliderComponent {
  slides: Slide[] = [
    { image: 'canon.jpg', title: 'Cameras', items: '5k', link: '/product', category: 'Camera' },
    { image: '81uTW77d3rL.__AC_SY300_SX300_QL70_ML2_-removebg-preview.png', title: 'Laptops', items: '2.3k', link: '/product', category: 'Laptop' },
    { image: '61RCRdEvQlL._AC_SY606_-removebg-preview(1).png', title: 'Mobile', items: '9k', link: '/product', category: 'Mobile' },
    { image: '71DMsp+X-pL._AC_UY327_QL65_.jpg', title: 'Speakers', items: '1.6k', link: '/product', category: 'HeadPhone' },
    { image: 'led-tv-mockup_1263326-35856-removebg-preview.png', title: 'Screens', items: '2k', link: '/product', category: 'Tv' },
  ];

  currentIndex = 0;
  slideInterval: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.updateSlides();
    }, 3000);
  }

  stopAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  updateSlides() {
    const firstSlide = this.slides.shift();
    if (firstSlide) {
      this.slides.push(firstSlide);
    }
  }

  prevSlide() {
    this.stopAutoSlide();
    const lastSlide = this.slides.pop();
    if (lastSlide) {
      this.slides.unshift(lastSlide);
    }
    setTimeout(() => this.startAutoSlide(), 3000);
  }

  nextSlide() {
    this.stopAutoSlide();
    this.updateSlides();
    setTimeout(() => this.startAutoSlide(), 3000);
  }

  goToPage(link: string, category: string) {
    if (link && category) {
      this.router.navigate([link], { queryParams: { category } });
    } else {
      console.error('Link or category is not defined for this slide.');
    }
  }

}
