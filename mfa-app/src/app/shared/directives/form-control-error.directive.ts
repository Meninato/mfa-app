import { ComponentRef, Directive, ElementRef, Host, Input, OnDestroy, OnInit, Optional, Self, ViewContainerRef } from "@angular/core";
import { AbstractControl, ControlContainer, NgControl, ValidationErrors } from "@angular/forms";
import { EMPTY, NEVER, Observable, Subject, debounceTime, distinctUntilChanged, fromEvent, map, merge, startWith, switchMap, takeUntil, tap } from "rxjs";
import { FormActionDirective } from "./form-action.directive";
import { FormControlErrorComponent } from "@app/shared/components/form-control-error/form-control-error.component";
import { FormControlErrorAnchorDirective } from "@app/shared/directives/form-control-error-anchor.directive";
import { FormErrorMessageService } from "@app/core/services/form-error-message.service";

@Directive({
  selector: '[formControlName], [formControl]'
})
export class FormControlErrorDirective implements OnInit, OnDestroy {
  @Input() controlErrorAnchor?: FormControlErrorAnchorDirective;
  
  private ref!: ComponentRef<FormControlErrorComponent> | null;
  private anchor!: ViewContainerRef;
  private destroy = new Subject<void>();
  private submit$: Observable<Event | null>;
  private reset$: Observable<Event>;
  private host: HTMLElement;
  private control!: AbstractControl;

  constructor(
    private formErrorMessageService: FormErrorMessageService,
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef<HTMLElement>,
    private ngControl: NgControl,
    @Optional() @Host() private form: FormActionDirective,
    @Optional() @Self() private controlContainer: ControlContainer,
    @Optional() private controlErrorAnchorParent: FormControlErrorAnchorDirective
  ) {
    this.host = this.elementRef.nativeElement;
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
    this.reset$ = this.form ? this.form.reset$ : EMPTY;
  }

  ngOnInit(): void {
    this.anchor = this.resolveAnchor();
    this.control = (this.controlContainer || this.ngControl).control!;
    const statusChanges$ = this.control.statusChanges.pipe(distinctUntilChanged());
    const valueChanges$ = this.control.valueChanges.pipe(debounceTime(1000));
    const controlChanges$ = merge(statusChanges$, valueChanges$);
    
    const submit$ = merge(
      this.submit$.pipe(map(() => 'submit')),
      this.reset$.pipe(
        map(() => 'reset'),
        tap(() => this.hideError())
      )
    );

    const blur$ = fromEvent(this.host, 'focusin');
    const changesOnBlur$ = blur$.pipe(switchMap(() => valueChanges$.pipe(startWith('focusin'))));

    const changesOnSubmit$ = submit$.pipe(
      switchMap((submit) => (submit === 'submit' ? controlChanges$.pipe(startWith('submit')) : NEVER))
    );

    this.reset$.pipe(takeUntil(this.destroy)).subscribe(() => this.clearRefs());

    merge(changesOnBlur$, changesOnSubmit$)
    .pipe(takeUntil(this.destroy))
    .subscribe((etype) => {
      const hasErrors = !!this.control.errors;
      if (hasErrors && etype === 'submit') {
        this.showError();
      } else if(etype === 'reset' || etype === 'focusin') {
        this.hideError();
      }
    });
    
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

  showError(): void {
    const controlErrors = this.control.errors;
    if (controlErrors) {
      const firstKey = Object.keys(controlErrors)[0];
      console.log(firstKey);
      console.log(controlErrors[firstKey]);
      this.setError("olá");
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
}