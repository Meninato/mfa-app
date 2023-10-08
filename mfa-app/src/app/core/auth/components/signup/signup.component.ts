import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IAuthLoginResponse } from "@app/core/models/auth.model";
import { AuthService } from "@app/core/services/auth.service";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { take } from "rxjs";

@Component({
  selector: 'auth-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {
  signupForm = this.createForm();

  constructor(private authService: AuthService) {
      this.authService.login({email: 'bob@blue.com', password: '12345678'}).pipe(take(1)).subscribe({
        next: (response: IAuthLoginResponse) => console.log(response),
        error: (err) => console.log(err)
      });
  }

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