import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[controlErrorAnchor]',
  exportAs: 'controlErrorAnchor'
})
export class FormControlErrorAnchorDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}