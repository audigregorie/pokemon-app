import { Directive, ElementRef, HostListener, Input } from '@angular/core'

@Directive({
  selector: '[pkmBorderCard]',
})
export class BorderCardDirective {
  public initialColor: string = '#f5f5f5'
  public defaultColor: string = '#009688'
  public defaultHeight: number = 180

  // Assign the color directly to the Input in the html
  @Input('pkmBorderCard') public borderColor: string

  constructor(private el: ElementRef) {
    this.setBorder(this.initialColor)
    this.setHeight(this.defaultHeight)
  }

  @HostListener('mouseenter')
  public onMouseEnter() {
    this.setBorder(this.borderColor || this.defaultColor)
  }

  @HostListener('mouseleave')
  public onMouseLeave() {
    this.setBorder('#f5f5f5')
  }

  public setBorder(color: string) {
    this.el.nativeElement.style.border = `solid 4px ${color}`
  }

  public setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}px`
  }
}
