import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import * as fromAuth from '@app/core/store/auth';
import { Subscription } from "rxjs";

@Component({
  selector: 'auth-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy{
  signupForm!: FormGroup;
  isLoading: boolean = false;

  private loadingSubs?: Subscription;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.signupForm = this.createForm();
    this.loadingSubs = this.store.select(fromAuth.AuthSelectors.selectAuthIsLoading).subscribe(
      (loading) => this.isLoading = loading
    );

    this.signupForm = this.createForm();
  }

  ngOnDestroy(): void {
    this.loadingSubs?.unsubscribe();
  }

  onSubmit() {
    if(this.signupForm.valid) {
      const firstName = this.signupForm.get('firstName')?.value;
      const lastName = this.signupForm.get('lastName')?.value;
      const email = this.signupForm.get('email')?.value;
      const password = this.signupForm.get('password')?.value;
      const confirmPassword = this.signupForm.get('confirmPassword')?.value;
      const acceptTerms = this.signupForm.get('terms')?.value;

      this.store.dispatch(fromAuth.AuthActions.register({
        request: {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          acceptTerms
        }
      }));
    }
  }

  private createForm() {
    return new FormGroup(
      {
        'firstName': new FormControl(null, [Validators.required, Validators.maxLength(50)]), 
        'lastName': new FormControl(null, [Validators.required, Validators.maxLength(100)]),
        'email': new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(254)]),
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