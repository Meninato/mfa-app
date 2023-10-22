import { Directive, ElementRef, Input, OnInit } from "@angular/core";
import { Dropdown, DropdownOptions } from "flowbite";

@Directive({
  selector: '[dropdown]'
})
export class DropdownDirective implements OnInit {
  
  @Input({alias: 'menuEl', required: true}) menuEl!: HTMLElement;

  constructor(private triggerElRef: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    this.initDropdown();
  }

  private initDropdown() {
    const options: DropdownOptions = {
      placement: 'bottom',
      triggerType: 'click',
      offsetSkidding: 0,
      offsetDistance: 10,
      delay: 300,
      onHide: () => { },
      onShow: () => { },
      onToggle: () => { }
    };

    new Dropdown(this.menuEl, this.triggerElRef.nativeElement, options);
  }
}