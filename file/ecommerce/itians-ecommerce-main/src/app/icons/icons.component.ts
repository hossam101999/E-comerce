import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-icons',
  standalone: true,
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.css']
})
export class IconsComponent implements AfterViewInit {
  @ViewChild('marqueeContent', { static: false }) marqueeContent: ElementRef | undefined;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {

    setTimeout(() => {
      const root: HTMLElement = document.documentElement;
      const marqueeElementsDisplayed: number = parseInt(
        getComputedStyle(root).getPropertyValue("--marquee-elements-displayed"),
        10
      );

      if (this.marqueeContent) {
        const marqueeContentElement = this.marqueeContent.nativeElement as HTMLUListElement;
        const totalChildren = marqueeContentElement.children.length;

        root.style.setProperty("--marquee-elements", totalChildren.toString());

        for (let i = 0; i < marqueeElementsDisplayed; i++) {
          const clone: Node = marqueeContentElement.children[i % totalChildren].cloneNode(true);
          this.renderer.appendChild(marqueeContentElement, clone);
        }
      } else {
        console.error('Marquee Content Element is not found!');
      }
    }, 100);
  }
}
