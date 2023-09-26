import { AfterContentInit, AfterViewInit, Component, ContentChild, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, forwardRef } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { FormFieldErrorMessageService } from "@app/core/services/form-field-error-message.service";
import { SubmitFormComponent } from "@app/shared/components/submit-form/submit-form.component";
import { FormSubmitService } from "@app/shared/services/form-submit.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit, OnDestroy{
  errorMessage: string | undefined | null = '';
  @Input({required: true}) control!: AbstractControl | null;

  private subscription?: Subscription;

  constructor(
    private formFieldErrorService: FormFieldErrorMessageService, 
    private formSubmitService: FormSubmitService) { }

    //passar só o nome e depois através do subscribe pegar o controls e filtrar com pipe

  ngOnInit(): void {
    this.subscription = this.formSubmitService.onSubmitted().subscribe((_) => {
      console.log("quantas");
      console.log(this.control);

      this.errorMessage = null;
      if(this.control) {
        for(const validationKeyName in this.control.errors) {
          console.log("keyname", validationKeyName);
          if(this.control.touched && this.control.invalid) {
            this.errorMessage = this.formFieldErrorService.getValidatorErrorMessage(
              validationKeyName, 
              this.control.errors[validationKeyName]);
          }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  // hasErrors(): boolean {
  //   console.log("foda");
  //   return this.control !== null && this.control.invalid && this.isSubmitted();
  // }

  // private isSubmitted(): boolean {
  //   return this.formComponent.formGroup.isSubmitted;
  // }

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