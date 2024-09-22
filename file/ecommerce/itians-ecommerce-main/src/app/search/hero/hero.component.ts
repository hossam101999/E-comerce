import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero2',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent2 {
texts: string[] = ['Enjoy Top Tech Here', 'Explore the Latest Gadgets', 'Shop the Best in Electronics', 'To ITIANS'];
  typingSpeed: number = 100;
  erasingSpeed: number = 50;
  pauseBetweenTexts: number = 1500;

  displayedText: string = '';
  private currentTextIndex: number = 0;
  private currentCharIndex: number = 0;
  private isTyping: boolean = true;
  private intervalId: any;

  images: string[] = [
    '/0486fbf3-a3f0-43dc-817d-3f96da230707.jpeg',
    '/samsung_web-banner__2368x800_en.png',
    '/2368_x_800_en.jpg',
    '/lg_2368x800_en.jpg',
    '/haier_laundry_2368x800_en.jpg',
    "/eeeeeeeeee.jpg"
  ];
  activeIndex: number = 0;

  ngOnInit() {
    this.startCarousel();
  }


  startCarousel() {
    setInterval(() => {
      this.activeIndex = (this.activeIndex + 1) % this.images.length;
    }, 5000); // Change every 3 seconds
  }
}
