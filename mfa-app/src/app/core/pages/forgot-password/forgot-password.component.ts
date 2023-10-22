import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import * as fromAuth from '@app/core/store/auth';

@Component({
  selector: 'auth-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  forgotPassForm!: FormGroup; 
  isLoading: boolean = false;

  private loadingSubs?: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.forgotPassForm = this.createForm();
    this.loadingSubs = this.store.select(fromAuth.AuthSelectors.selectAuthIsLoading).subscribe(
      (loading) => this.isLoading = loading
    );
  }

  ngOnDestroy(): void {
    this.loadingSubs?.unsubscribe();
  }

  onSubmit() {
    if(this.forgotPassForm.valid) {
      const email:string = this.forgotPassForm.get('email')?.value;
      this.store.dispatch(fromAuth.AuthActions.recoverPassword({request: {email}}));
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