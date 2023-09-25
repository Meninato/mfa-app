import { AfterContentInit, AfterViewInit, Component, ContentChild, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, forwardRef } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { FormFieldErrorMessageService } from "@app/core/services/form-field-error-message.service";
import { SubmitFormComponent } from "@app/shared/components/submit-form/submit-form.component";
import { Subscription } from "rxjs";

@Component({
  selector: 'form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit, OnDestroy, AfterContentInit {

  private subscription?: Subscription;
  showError: boolean = false;

  @Input({required: true}) control!: AbstractControl | null;

  @ContentChild(SubmitFormComponent) formComponent!: SubmitFormComponent;

  constructor(
    // @Inject(forwardRef(() => SubmitFormComponent)) private formComponent: SubmitFormComponent,
    private formFieldErrorService: FormFieldErrorMessageService) { }

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    this.subscription = this.formComponent.onSubmitted$.subscribe((_) => {
      this.showError = this.hasErrors();
      console.log("quantas");
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  hasErrors(): boolean {
    console.log("foda");
    return this.control !== null && this.control.invalid && this.isSubmitted();
  }

  private isSubmitted(): boolean {
    return this.formComponent.formGroup.isSubmitted;
  }

  // get errorMessage(): string | null | undefined {
  //   if(this.control != null) {
  //     console.log(this.control);
  //     for(const validationKeyName in this.control.errors) {
  //       if(this.control.touched && this.control.invalid) {
  //         return this.formFieldErrorService.getValidatorErrorMessage(validationKeyName, this.control.errors[validationKeyName]);
  //       }
  //     }
  //   }

  //   return null;
  // }
}