import {Directive, ElementRef, HostListener, OnInit, Renderer2} from "@angular/core"

@Directive({
  selector: '[shadowCard]'
})
export class ShadowCardDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  private transformElement(scale: number, boxShadowColor: string): void {
    this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(${scale})`);
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', `6px 6px 2px 1px ${boxShadowColor}`);
  }

  @HostListener('mouseenter') onEnter() {
    this.transformElement(1.1, 'blue');
  }

  @HostListener('mouseleave') onLeave() {
    this.transformElement(1, '#747474');
  }

  ngOnInit() : void {
    this.transformElement(1, '#747474');
  }
}

