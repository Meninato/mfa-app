import { Component, ElementRef, Input, Output, Renderer2, ViewChild, ViewEncapsulation } from "@angular/core";
import { SubmitFormGroup } from "@app/shared/models/SubmitFormGroup";
import { Subject } from "rxjs";

const inputTypes = ['input', 'select', 'checkbox', 'radio'];

@Component({
  selector: 'submit-form',
  templateUrl: './submit-form.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SubmitFormComponent {

  
  @Input({required: true}) formGroup!: SubmitFormGroup;
  
  @ViewChild('formElement', { static: true }) formElement!: ElementRef<HTMLFormElement>;

  @Output() onSubmitted$: Subject<void> = new Subject();
      
  constructor(private render2: Renderer2) {}

  submit(): void {
    console.log("clicou");
    this.toggleSubmittedClass();
    this.formGroup.isSubmitted = true;
    this.onSubmitted$.next();
  }

  reset(value?: any, options?: { onlySelf?: boolean | undefined; emitEvent?: boolean | undefined; } | undefined): void {
    this.toggleSubmittedClass(true);
    this.formGroup.reset(value, options);
  }

  private toggleSubmittedClass(remove: boolean = false): void {
    const submittedClass = 'ng-submitted';
    const collections: Array<HTMLCollectionOf<Element>> = [];
    const formElem = this.formElement.nativeElement;
    remove ? this.render2.removeClass(formElem, submittedClass) : this.render2.addClass(formElem, submittedClass);
    let field, classList;
    inputTypes.forEach(i => collections.push(formElem.getElementsByTagName(i)));
    collections.forEach(c => {
        for (let i = 0; i < c.length; i++) {
            field = c.item(i);
            classList = field ? field.classList : null;
            if (field && classList) {
                remove ? this.render2.removeClass(field, submittedClass) : this.render2.addClass(field, submittedClass);
            }
        }
    });
  }
}