import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from "@angular/core"

const DARK_GRAY_COLOR = '#747474';
const BLUE_COLOR = 'blue';

@Directive({
  selector: '[shadowCard]'
})

export class ShadowCardDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() : void {
    this.transformElement(1, DARK_GRAY_COLOR);
  }

  @HostListener('mouseenter') onEnter() : void {
    this.transformElement(1.1, BLUE_COLOR);
  }

  @HostListener('mouseleave') onLeave() : void {
    this.transformElement(1, DARK_GRAY_COLOR);
  }

  private transformElement(scale: number, boxShadowColor: string): void {
    this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(${scale})`);
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', `6px 6px 2px 1px ${boxShadowColor}`);
  }
}

