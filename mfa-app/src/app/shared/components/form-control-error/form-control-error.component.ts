import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2 } from "@angular/core";

@Component({
  selector: 'control-error',
  template: `
    <p class="mt-2 text-sm text-red-600 dark:text-red-500" [class.hidden]="hideError" *ngIf="!hideError">{{ errorText }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormControlErrorComponent{
  errorText: string | null = null;
  hideError = true;

  private addClasses: string[] = [];

  constructor(
    private cdr: ChangeDetectorRef, 
    private host: ElementRef<HTMLElement>, 
    private renderer2: Renderer2) {}

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