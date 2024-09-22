import { NgFor } from '@angular/common';
import { Component,AfterViewInit } from '@angular/core';
import * as $ from 'jquery';
import 'owl.carousel';

@Component({
  selector: 'app-our-team',
  standalone: true,
  imports: [NgFor],
  templateUrl: './our-team.component.html',
  styleUrl: './our-team.component.css'
})
export class OurTeamComponent implements AfterViewInit {
  profiles = [
    { name: 'Amr Kataria', title: 'CEO & Owner', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi at consequat unde.', image: '/sdddd3333.jpg' },
    { name: 'Ebrahim SaMad', title: 'Junior Software Engineer', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi at consequat unde.', image: 'WhatsApp Image 2024-08-08 at 17.04.57.jpeg' },
    { name: 'Hossam Salah', title: 'Junior Software Engineer', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi at consequat unde.', image: 'WhatsApp Image 2024-08-08 at 17.11.362222.jpeg' },
    { name: 'Mohamed Hesham', title: 'Junior Software Engineer', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi at consequat unde.', image: 'WhatsApp Image 2024-08-08 at 18.02.45.jpeg' },
    { name: 'Fatma Youssef', title: 'Junior Software Engineer', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi at consequat unde.', image: '/WhatsApp Image 2024-08-08 at 19.14.3433333333333333333333.jpeg' }
  ];

  ngAfterViewInit(): void {
    (window as any).$('.owl-carousel').owlCarousel({
      items: 3, 
          loop: true, 
          margin: 10, 
          nav: false, 
          dots: true, 
          autoplay: true, 
          autoplayTimeout: 3000, 
          autoplayHoverPause: true, 
          responsive: {
            0: {
              items: 1
            },
            576: {
              items: 1
            },
            768: {
              items: 3
            }
          }
    });
  }

}
