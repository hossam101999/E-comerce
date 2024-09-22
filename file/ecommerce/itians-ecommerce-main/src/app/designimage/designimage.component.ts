import { Component, AfterViewInit } from '@angular/core';
import { SliderImageComponent } from '../slider-image/slider-image.component';
import { ImageDesginComponent } from '../image-desgin/image-desgin.component';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-designimage',
  standalone: true,
  imports: [SliderImageComponent, ImageDesginComponent],
  templateUrl: './designimage.component.html',
  styleUrls: ['./designimage.component.css'],
})
export class DesignimageComponent {
  constructor(private router: Router) {}
  texts: string[] = [
    'Enjoy with us',
    'To ITIANS',
    'Explore the Latest',
    'Shop the Best ',
  ];
  typingSpeed: number = 100;
  erasingSpeed: number = 50;
  pauseBetweenTexts: number = 1500;

  displayedText: string = '';
  private currentTextIndex: number = 0;
  private currentCharIndex: number = 0;
  private isTyping: boolean = true;
  private intervalId: any;


  ngOnInit() {
    this.startTypingEffect();
  }

  startTypingEffect() {
    this.intervalId = setInterval(
      () => {
        if (this.isTyping) {
          this.type();
        } else {
          this.erase();
        }
      },
      this.isTyping ? this.typingSpeed : this.erasingSpeed
    );
  }

  type() {
    if (this.currentCharIndex < this.texts[this.currentTextIndex].length) {
      this.displayedText +=
        this.texts[this.currentTextIndex][this.currentCharIndex];
      this.currentCharIndex++;
    } else {
      this.isTyping = false;
      clearInterval(this.intervalId);
      setTimeout(() => this.startTypingEffect(), this.pauseBetweenTexts);
    }
  }

  erase() {
    if (this.currentCharIndex > 0) {
      this.displayedText = this.displayedText.slice(0, -1);
      this.currentCharIndex--;
    } else {
      this.isTyping = true;
      this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
      clearInterval(this.intervalId);
      setTimeout(() => this.startTypingEffect(), this.pauseBetweenTexts);
    }
  }

  navigateToProduct() {
    this.router.navigate(['/product']);
  }
}
