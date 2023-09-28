import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2, TemplateRef } from "@angular/core";
import { ValidationErrors } from "@angular/forms";

export type ErrorComponentTemplate = TemplateRef<{ $implicit: ValidationErrors; text: string }>;

export interface IControlErrorComponent {
  customClass: string | string[];
  text: string | null;
  createTemplate?(tpl: ErrorComponentTemplate, error: ValidationErrors, text: string): void;
}

@Component({
  selector: 'control-error',
  template: `
    <p class="mt-2 text-sm text-red-600 dark:text-red-500" [class.hidden]="hideError" *ngIf="!errorTemplate">{{ errorText }}</p>
    <ng-template *ngTemplateOutlet="errorTemplate; context: errorContext"></ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormControlErrorComponent implements IControlErrorComponent {
  errorText: string | null = null;
  hideError = true;
  errorTemplate: ErrorComponentTemplate | undefined;
  errorContext?: { $implicit: ValidationErrors; text: string };

  private addClasses: string[] = [];

  constructor(
    private cdr: ChangeDetectorRef, 
    private host: ElementRef<HTMLElement>, 
    private renderer2: Renderer2) {}

  createTemplate(tpl: ErrorComponentTemplate, error: ValidationErrors, text: string) {
    this.errorTemplate = tpl;
    this.errorContext = { $implicit: error, text };
    this.cdr.markForCheck();
  }

  set customClass(classes: string | string[]) {
    if (!this.hideError) {
      this.addClasses = Array.isArray(classes) ? classes : classes.split(/\s/);
      this.addClasses.forEach(ClassName => this.renderer2.addClass(this.host.nativeElement, ClassName));
    }
  }

  set text(value: string | null) {
    if (value !== this.errorText) {
      this.errorText = value;
      this.hideError = !value;
      if (this.hideError) {
        this.addClasses.forEach(ClassName => this.renderer2.removeClass(this.host.nativeElement, ClassName));
      }
      this.cdr.markForCheck();
    }
  }
}