import { ComponentRef, Directive, ElementRef, Host, Input, OnDestroy, OnInit, Optional, Self, TemplateRef, ViewContainerRef } from "@angular/core";
import { AbstractControl, ControlContainer, NgControl, ValidationErrors } from "@angular/forms";
import { EMPTY, NEVER, Observable, Subject, distinctUntilChanged, map, merge, startWith, switchMap, tap } from "rxjs";
import { FormActionDirective } from "./form-action.directive";
import { FormControlErrorComponent } from "@app/shared/components/form-control-error/form-control-error.component";
import { FormControlErrorAnchorDirective } from "@app/shared/directives/form-control-error-anchor.directive";

@Directive({
  selector: '[formControlName], [formControl]'
})
export class FormControlErrorDirective implements OnInit, OnDestroy {
  @Input() controlErrorAnchor?: FormControlErrorAnchorDirective;
  @Input() controlErrorsTpl: TemplateRef<any> | undefined;
  
  private ref: ComponentRef<FormControlErrorComponent>;
  private anchor: ViewContainerRef;
  private destroy = new Subject<void>();
  private submit$: Observable<Event | null>;
  private reset$: Observable<Event>;
  private host: HTMLElement;
  private control: AbstractControl;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() private ngControl: NgControl,
    @Optional() @Host() private form: FormActionDirective,
    @Optional() @Self() private controlContainer: ControlContainer,
    @Optional() private controlErrorAnchorParent: FormControlErrorAnchorDirective
  ) {
    this.host = this.elementRef.nativeElement;
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
    this.reset$ = this.form ? this.form.reset$ : EMPTY;
    this.control = (this.controlContainer || this.ngControl.control).control!;
  }

  ngOnInit(): void {

    const statusChanges$ = this.control.statusChanges.pipe(distinctUntilChanged());
    const valueChanges$ = this.control.valueChanges;
    const controlChanges$ = merge(statusChanges$, valueChanges$);
    
    const submit$ = merge(
      this.submit$.pipe(map(() => true)),
      this.reset$.pipe(
        map(() => false),
        tap(() => this.hideError())
      )
    );

    const changesOnSubmit$ = submit$.pipe(
      switchMap((submit) => (submit ? controlChanges$.pipe(startWith(true)) : NEVER))
    );
    
  }

  ngOnDestroy(): void {
    this.destroy.next();
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

  private setError(text: string, error: ValidationErrors): void {
      this.ref ??= this.anchor.createComponent(FormControlErrorComponent);
      const instance = this.ref.instance;

      if (this.controlErrorsTpl) {
        instance.createTemplate(this.controlErrorsTpl, error, text);
      } else {
        instance.text = text;
      }
  }


}

/*
  private setError(text: string, error?: ValidationErrors) {
    if (this.mergedConfig.controlClassOnly) {
      return;
    }

    this.ref ??= this.anchor.createComponent<ControlErrorComponent>(this.mergedConfig.controlErrorComponent);
    const instance = this.ref.instance;

    if (this.controlErrorsTpl) {
      instance.createTemplate(this.controlErrorsTpl, error, text);
    } else {
      instance.text = text;
    }

    if (this.controlErrorsClass) {
      instance.customClass = this.controlErrorsClass;
    }

    if (!this.controlErrorAnchor && this.mergedConfig.controlErrorComponentAnchorFn) {
      this.customAnchorDestroyFn = this.mergedConfig.controlErrorComponentAnchorFn(
        this.host,
        (this.ref.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement
      );
    }
  }
*/