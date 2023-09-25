import { Component, ElementRef, OnInit, Output, Renderer2, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SubmitFormGroup } from "@app/shared/models/SubmitFormGroup";
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
  signInForm!: SubmitFormGroup;

  ngOnInit(): void {
    this.signInForm = this.createForm();
  }

  onSubmit(data: any) {
    console.log(data);
  }

  private createForm() {
    console.log(true);
    return new SubmitFormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }
}