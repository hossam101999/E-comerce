import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-image-complete',
  standalone: true,
  imports: [],
  templateUrl: './image-complete.component.html',
  styleUrl: './image-complete.component.css'
})
export class ImageCompleteComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  ngOnInit(): void {
    setTimeout(() => {
      const svgElement = this.el.nativeElement.querySelector('svg');
      if (svgElement) {
        this.renderer.setAttribute(svgElement, 'class', svgElement.classList.contains('active') ? '' : 'active');
      }
    }, 0);
  }
}
