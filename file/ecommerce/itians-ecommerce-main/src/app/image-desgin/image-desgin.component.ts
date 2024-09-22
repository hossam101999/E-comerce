import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import Hammer from 'hammerjs';

@Component({
  selector: 'app-image-desgin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-desgin.component.html',
  styleUrls: ['./image-desgin.component.css'],
})
export class ImageDesginComponent implements AfterViewInit {
  @ViewChild('board', { static: false }) board!: ElementRef;

  images: string[] = [
    '/output-onlinepngtools (10).png',
    '/output-onlinepngtools (11).png',
    '/output-onlinepngtools (15).png',
    '/output-onlinepngtools (16).png',
    '/output-onlinepngtools (17).png',
    '/output-onlinepngtools__11vvvvvvvvvvvvvvvvvvvvvvvvvvvv_-removebg-preview.png',
    '/output-onlinepngtools (12).png',
    '/output-onlinepngtools (18).png',
    '/output-onlinepngtools (20).png',
  ];

  currentIndex = 0;
  topCard!: HTMLElement;
  hammer!: HammerManager;
  isPanning = false;

  ngAfterViewInit() {
    this.showCard();
    this.setupHammer();
    this.autoSwipe();
  }

  setupHammer() {
    if (!this.topCard) return;

    this.hammer = new Hammer(this.topCard);
    this.hammer.add(
      new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 })
    );

    this.hammer.on('pan', (e) => this.onPan(e));
  }

  onPan(e: any) {
    if (!this.isPanning) {
      this.isPanning = true;
      this.topCard.style.transition = '';

      let posX = e.deltaX;
      let posY = e.deltaY;

      const propX = e.deltaX / this.board.nativeElement.clientWidth;
      const deg = propX * 30;

      this.topCard.style.transform = `translateX(${posX}px) translateY(${posY}px) rotate(${deg}deg)`;

      if (e.isFinal) {
        this.isPanning = false;
        this.topCard.style.transition =
          'transform 0.3s ease-out, opacity 0.3s ease-out';

        if (Math.abs(propX) > 0.25) {
          posX =
            e.deltaX > 0
              ? this.board.nativeElement.clientWidth
              : -this.board.nativeElement.clientWidth;
          this.topCard.style.transform = `translateX(${posX}px) translateY(${posY}px) rotate(${deg}deg)`;
          this.topCard.style.opacity = '0';
          setTimeout(() => {
            this.removeCard();
            this.showCard();
            this.setupHammer();
          }, 300);
        } else {
          this.topCard.style.transform = 'translate(0, 0) rotate(0deg)';
        }
      }
    }
  }

  removeCard() {
    if (this.topCard && this.board.nativeElement.contains(this.topCard)) {
      this.board.nativeElement.removeChild(this.topCard);
    }
  }

  showCard() {
    this.topCard = document.createElement('div');
    this.topCard.className = 'card-container';

    const imageUrl = this.images[this.currentIndex];
    this.currentIndex = (this.currentIndex + 1) % this.images.length;

    this.topCard.innerHTML = `<img src="${imageUrl}" class="img-fluid" alt="product-image"/>`;
    this.board.nativeElement.appendChild(this.topCard);
  }

  autoSwipe() {
    setInterval(() => {
      this.onPan({
        deltaX: -this.board.nativeElement.clientWidth,
        deltaY: 0,
        isFinal: true,
      });
    }, 5000);
  }
}
