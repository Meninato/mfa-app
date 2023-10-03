import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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
    console.log(this.signInForm);
  }

  private createForm() {
    return new FormGroup(
      {
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      },
      {
        updateOn: "change"
      }
    );
  }
}