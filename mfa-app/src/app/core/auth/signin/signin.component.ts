import { Component, ElementRef, OnInit, Output, Renderer2, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormControl, FormControlName, FormGroup, Validators } from "@angular/forms";
import { SubmitFormGroup } from "@app/shared/models/SubmitFormGroup";
import { FormSubmitService } from "@app/shared/services/form-submit.service";
import { BehaviorSubject, Subject } from "rxjs";

interface AuthCredentials {
  email: string;
  password: string;
}

@Component({
  selector: 'auth-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [FormSubmitService]
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;

  @ViewChild('formRef', {static: true}) formRef!: ElementRef<HTMLFormElement>;

  constructor(private formSubmitService: FormSubmitService) {}

  ngOnInit(): void {
    this.signInForm = this.createForm();
    this.formSubmitService.formElement = this.formRef;
  }

  onSubmit() {
    console.log(this.signInForm.value);
    this.formSubmitService.submit();
  }

  onFocus(event: Event) {
    const element = event.target as HTMLElement;
    if(element && element.classList.contains(this.formSubmitService.submittedClass)) {
      this.signInForm.get(element.getAttribute('formcontrolname')!)?.setErrors(null);
      this.formSubmitService.clearErrorOnControl(element);
    }
  }

  private createForm() {
    console.log(true);
    return new SubmitFormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }
}