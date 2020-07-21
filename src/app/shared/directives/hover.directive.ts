import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive ({
  selector: '[appHover]'
})
export class HoverDirective {
  @HostBinding('class.mouse-on') isHovered = false;
  @HostListener('mouseenter') onMouseEnter(): void {
    this.isHovered = true;
  }
  @HostListener('mouseleave') onMouseLeave(): void {
    this.isHovered = false;
  }
}
