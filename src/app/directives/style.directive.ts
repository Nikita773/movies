import {Directive, ElementRef, HostListener, Renderer2} from "@angular/core";

@Directive({
  selector: '[posterStyle]'
})
export class StyleDirective {
  constructor(private el: ElementRef, private r: Renderer2) {}

  @HostListener('mouseenter', ['$event']) onEnter(event: Event) {
    this.r.setStyle(this.el.nativeElement, 'transform', 'scale(1.2)')
    this.r.setStyle(this.el.nativeElement, 'box-shadow', '5px 2px 2px blue')
  }

  @HostListener('mouseleave', ['$event']) onLeave(event: Event) {
    this.r.setStyle(this.el.nativeElement, 'transform', 'scale(1)')
    this.r.setStyle(this.el.nativeElement, 'box-shadow', '5px 2px 2px #747474')
  }
}

