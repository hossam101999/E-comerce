import { NgFor } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-image',
  standalone: true,
  imports: [NgFor],
  templateUrl: './slider-image.component.html',
  styleUrls: ['./slider-image.component.css']
})
export class SliderImageComponent implements OnInit {
  items = [
    { src: '/61RCRdEvQlL._AC_SY606_-removebg-preview(1).png' },
    { src: '/517T+qc6dXL._AC_SX466_-removebg-preview(1).png' },
    { src: '/61KXw2MXBgL._AC_SX569_-removebg(1).png' },


  ];

  width: number = 0;
  height: number = 0;
  totalWidth: number = 0;
  margin = 20;
  currIndex = 0;
  interval: any;
  intervalTime = 4000;

  ngOnInit(): void {
    this.init();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.resize();
  }

  init() {
    this.resize();
    this.move(Math.floor(this.items.length / 2));
    this.timer();
  }

  resize() {
    this.width = Math.max(window.innerWidth * 0.25, 275);
    this.height = window.innerHeight * 0.5;
    this.totalWidth = this.width * this.items.length;
  }

  move(index: number) {
    if (index < 1) index = this.items.length;
    if (index > this.items.length) index = 1;
    this.currIndex = index;

    const slider = document.querySelector('.carousel__slider') as HTMLElement | null;
    const itemElements = document.querySelectorAll('.carousel__slider__item');

    if (!slider || itemElements.length === 0) return;

    itemElements.forEach((item, i) => {
      const itemElement = item as HTMLElement;
      const box = itemElement.querySelector('.item__3d-frame') as HTMLElement | null;

      if (box) {
        if (i === index - 1) {
          itemElement.classList.add('carousel__slider__item--active');
          box.style.transform = "perspective(1200px)";
        } else {
          itemElement.classList.remove('carousel__slider__item--active');
          box.style.transform = `perspective(1200px) rotateY(${i < index - 1 ? 40 : -40}deg)`;
        }
      }
    });

    slider.style.transform = `translateX(${(index * -this.width) + (this.width / 2) + window.innerWidth / 2}px)`;
  }

  timer() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.move(++this.currIndex);
    }, this.intervalTime);
  }

  prev() {
    this.move(--this.currIndex);
    this.timer();
  }

  next() {
    this.move(++this.currIndex);
    this.timer();
  }
}
