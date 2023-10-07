import { ComponentRef, Directive, ElementRef, Host, Input, OnDestroy, OnInit, Optional, ViewContainerRef } from "@angular/core";
import { AbstractControl, FormGroup, NgControl } from "@angular/forms";
import { EMPTY, Observable, Subject, debounceTime, filter, fromEvent, last, merge, takeLast, takeUntil, tap } from "rxjs";
import { FormActionDirective } from "./form-action.directive";
import { FormErrorMessageService } from "@app/core/services/form-error-message.service";
import { FormControlErrorComponent } from "../components/form-control-error/form-control-error.component";
import { FormControlErrorAnchorDirective } from "./form-control-error-anchor.directive";

@Directive({
  selector: '[formControlName], [formControl]'
})
export class FormControlErrorDirective implements OnInit, OnDestroy {
  @Input() controlErrorAnchor?: FormControlErrorAnchorDirective;

  private anchor!: ViewContainerRef;
  private ref: ComponentRef<FormControlErrorComponent> | null = null;
  private submit$: Observable<Event | null>;
  private reset$: Observable<Event>;
  private destroy = new Subject<void>();
  private element: HTMLElement;
  
  constructor(
                private ngControl: NgControl,
                private elementRef: ElementRef<HTMLElement>,
                private viewContainerRef: ViewContainerRef,
                private formErrorMessageService: FormErrorMessageService,
    @Host()     private form: FormActionDirective,
    @Optional() private controlErrorAnchorParent: FormControlErrorAnchorDirective) { 

      this.submit$ = this.form ? this.form.submit$ : EMPTY;
      this.reset$  = this.form ? this.form.reset$  : EMPTY;
      this.element = this.elementRef.nativeElement;

    }

  ngOnInit(): void {

    this.anchor = this.resolveAnchor();

    const valueChanges$ = this.control.valueChanges.pipe(debounceTime(600));
    const htmlEvent$ = this.removeErrorOnEvent(this.element);
    const formEvents$ = merge(this.submit$, this.reset$);

    this.reset$.pipe(takeUntil(this.destroy)).subscribe(() => this.clearRefs());

    const controlChanges$ = merge(formEvents$, valueChanges$, htmlEvent$);

    controlChanges$.pipe(
      takeUntil(this.destroy),
      filter((e) => e instanceof Event)
    )
    .subscribe((e: Event) => {
      const hasErrors = !!this.control.errors;
      if (hasErrors && e instanceof SubmitEvent ) {
        this.showError();
      } else {
        this.hideError();
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  get control() {
    return this.ngControl.control!;
  }

  showError(): void {

    const controlErrors = this.control.errors;
    if (controlErrors) {
      const firstKey = Object.keys(controlErrors)[0];
      const text = this.formErrorMessageService.getValidatorErrorMessage(firstKey, controlErrors[firstKey]);
      this.setError(text);
    }
  }

  hideError(): void {
    if (this.ref) {
      this.setError(null);
    }
  }

  private clearRefs(): void {
    this.ref?.destroy();
    this.ref = null;
  }

  private resolveAnchor() {
    if (this.controlErrorAnchor) {
      return this.controlErrorAnchor.viewContainerRef;
    }

    if (this.controlErrorAnchorParent) {
      return this.controlErrorAnchorParent.viewContainerRef;
    }
    return this.viewContainerRef;
  }

  private setError(text: string | null): void {
      this.ref ??= this.anchor.createComponent(FormControlErrorComponent);
      const instance = this.ref.instance;

      instance.text = text;
  }

  private removeErrorOnEvent(element: HTMLElement): Observable<Event> {
    let event$: Observable<Event> = EMPTY; 

    if(element.tagName === 'INPUT') {
      const input = <HTMLInputElement>element;

      const focusIn = ['email', 'password', 'text'];
      if(focusIn.includes(input.type)) {
        event$ = fromEvent(this.element, 'focusin');
      }
      else if(input.type === 'checkbox') {
        event$ = fromEvent(this.element, 'click');
      }
    }

    return event$;

    // return element.tagName === 'INPUT' || element.tagName === 'SELECT';
  }
}

export const getControlName = (control: AbstractControl): string | null =>
{
    let controlName: string | null = null;
    const parent = control["_parent"];

    // only such parent, which is FormGroup, has a dictionary 
    // with control-names as a key and a form-control as a value
    if (parent instanceof FormGroup)
    {
        // now we will iterate those keys (i.e. names of controls)
        Object.keys(parent.controls).forEach((name) =>
        {
            // and compare the passed control and 
            // a child control of a parent - with provided name (we iterate them all)
            if (control === parent.controls[name])
            {
                // both are same: control passed to Validator
                //  and this child - are the same references
                controlName = name;
            }
        });
    }

    // we either found a name or simply return null
    return controlName;
}