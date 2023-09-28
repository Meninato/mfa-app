import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[controlErrorAnchor]'
})
export class FormControlErrorAnchorDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}