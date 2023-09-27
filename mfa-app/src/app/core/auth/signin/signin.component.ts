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
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.signInForm = this.createForm();
  }

  onSubmit() {
    console.log(this.signInForm.value);
  }

  private createForm() {
    console.log(true);
    return new SubmitFormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }
}