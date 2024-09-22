import { NgClass, NgFor, NgStyle } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-carsel',
  standalone: true,
  imports: [NgClass,NgFor,NgStyle],
  templateUrl: './carsel.component.html',
  styleUrl: './carsel.component.css'
})
export class CarselComponent implements OnInit, OnDestroy {

  slides = [
    { image: '/photo-1457608135803-4827addc43e0-removebg-preview.png', title: 'Modern Designer Sofa', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elit ipsum, scelerisque non', bgColor: '#2d5356', altText: 'Modern Designer Sofa' },
    { image: 'photo-1457608135803-4827addc43e0-removebg-preview.png', title: 'Vintage Style Sofa', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elit ipsum, scelerisque non semper eu, aliquet vel odio.', bgColor: '#34504d', altText: 'Vintage Style Sofa' },
    { image: '/photo-1457608135803-4827addc43e0-removebg-preview.png', title: 'Stylish Sofa', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis elit ipsum, scelerisque non semper eu, aliquet vel odio.', bgColor: '#d09423', altText: 'Stylish Sofa' }
  ];

  indicators = Array(this.slides.length).fill(null);
  currentIndex = 0;
  interval = 6000;
  intervalId: any;

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  showSlide(index: number): void {
    const slides = document.querySelectorAll<HTMLElement>('.item');
    const indicators = document.querySelectorAll<HTMLElement>('.carousel-indicators li');

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      slide.style.transform = i === index ? 'translateY(0)' : 'translateY(100%)';
    });

    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });

    this.currentIndex = index;
  }

  nextSlide(): void {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.showSlide(nextIndex);
  }

  prevSlide(): void {
    const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prevIndex);
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => this.nextSlide(), this.interval);
  }
}

