import { Directive, ElementRef, Host, OnDestroy, OnInit, Optional, Self } from "@angular/core";
import { AbstractControl, ControlContainer, NgControl } from "@angular/forms";
import { EMPTY, Observable, Subject } from "rxjs";
import { FormActionDirective } from "./form-action.directive";

@Directive({
  selector: '[formControlName], [formControl]'
})
export class FormControlErrorDirective implements OnInit, OnDestroy {
  private destroy = new Subject<void>();
  private submit$: Observable<Event | null>;
  private reset$: Observable<Event>;
  private host: HTMLElement;
  private control: AbstractControl;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() private ngControl: NgControl,
    @Optional() @Host() private form: FormActionDirective,
    @Optional() @Self() private controlContainer: ControlContainer
  ) {
    this.host = this.elementRef.nativeElement;
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
    this.reset$ = this.form ? this.form.reset$ : EMPTY;
    this.control = (this.controlContainer || this.ngControl.control).control!;
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy.next();
  }
}