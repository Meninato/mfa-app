import { AfterContentInit, AfterViewInit, Directive, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { Dropdown, DropdownInterface, DropdownOptions } from "flowbite";

@Directive({
  selector: '[dropdown]'
})
export class DropdownDirective implements OnInit, AfterViewInit {
  
  private xxx!: HTMLElement;
  @ViewChild('ref', {static: false}) set ref(content: ElementRef<HTMLElement>) {
    if(content) {
      console.log(content);
      this.xxx = content.nativeElement;
    }
  } 

  private dropdown: DropdownInterface | null = null;

  constructor(private triggerElRef: ElementRef<HTMLElement>) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    const options: DropdownOptions = {
      placement: 'bottom',
      triggerType: 'click',
      offsetSkidding: 0,
      offsetDistance: 10,
      delay: 300,
      onHide: () => {
          console.log('dropdown has been hidden');
      },
      onShow: () => {
          console.log('dropdown has been shown');
      },
      onToggle: () => {
          console.log('dropdown has been toggled');
      }
    };

    console.log(this.xxx);
    // console.log(this.ref);

    // this.ref.changes.subscribe((comps: QueryList <HTMLElement>) =>
    // {
    //     if(!this.dropdown) {
    //       this.dropdown =  new Dropdown(comps.first, this.triggerElRef.nativeElement, options);
    //     }
    // });
    // const dropdown: DropdownInterface = new Dropdown(this.targetElRef.nativeElement, this.triggerElRef.nativeElement, options);
  }

}