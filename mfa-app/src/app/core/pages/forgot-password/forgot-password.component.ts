import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'auth-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPassForm = this.createForm();

  constructor() {}

  onSubmit() {
    if(this.forgotPassForm.valid) {

    }
  }

  private createForm() {
    return new FormGroup(
      {
        'email': new FormControl(null, [Validators.required, Validators.email])
      },
      {
        updateOn: "change"
      }
    );
  }
}