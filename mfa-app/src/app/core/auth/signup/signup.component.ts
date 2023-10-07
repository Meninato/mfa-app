import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RxwebValidators } from "@rxweb/reactive-form-validators";

@Component({
  selector: 'auth-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {
  signupForm = this.createForm();

  onSubmit() {
    if(this.signupForm.valid) {

    }
  }

  private createForm() {
    return new FormGroup(
      {
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
        'confirmPassword': new FormControl(null, [
          Validators.required, 
          RxwebValidators.compare({ fieldName: 'password' })
        ]),
        'terms': new FormControl(false, [Validators.requiredTrue])
      },
      {
        updateOn: "change"
      }
    );
  }
}