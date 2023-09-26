import { ElementRef, Injectable, Renderer2 } from "@angular/core";
import { Observable, Subject } from "rxjs";

const inputTypes = ['input', 'select', 'checkbox', 'radio'];

@Injectable()
export class FormSubmitService {

  formElement?: ElementRef<HTMLFormElement>;
  private onFormSubmitted$: Subject<void> = new Subject();
  readonly submittedClass = 'ng-submitted'; 

  constructor(private render2: Renderer2) {}

  submit(): void {
    this.toggleSubmittedClass();
    this.onFormSubmitted$.next();
  }

  clearErrorOnControl(element: HTMLElement): void {
    this.render2.removeClass(element, this.submittedClass);
    this.onFormSubmitted$.next();
  }

  onSubmitted(): Observable<void> {
    return this.onFormSubmitted$.asObservable();
  }

  private toggleSubmittedClass(remove: boolean = false): void {
    const collections: Array<HTMLCollectionOf<Element>> = [];
    if(this.formElement) {
      const formElem = this.formElement.nativeElement;
      remove ? this.render2.removeClass(formElem, this.submittedClass) : this.render2.addClass(formElem, this.submittedClass);
      let field, classList;
      inputTypes.forEach(i => collections.push(formElem.getElementsByTagName(i)));
      collections.forEach(c => {
          for (let i = 0; i < c.length; i++) {
              field = c.item(i);
              classList = field ? field.classList : null;
              if (field && classList) {
                  remove ? this.render2.removeClass(field, this.submittedClass) : this.render2.addClass(field, this.submittedClass);
              }
          }
      });
    }
  }
}