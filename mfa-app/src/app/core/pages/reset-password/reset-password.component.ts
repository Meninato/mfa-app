import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import * as fromAuth from '@app/core/store/auth';
import { Store } from "@ngrx/store";
import { RxwebValidators } from "@rxweb/reactive-form-validators";
import { Subscription } from "rxjs";

@Component({
  selector: 'auth-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  resetPassForm!: FormGroup; 
  isLoading: boolean = false;
  
  private token!: string;
  private loadingSubs?: Subscription;
  
  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.resetPassForm = this.createForm();
    this.loadingSubs = this.store.select(fromAuth.AuthSelectors.selectAuthIsLoading).subscribe(
      (loading) => this.isLoading = loading
    );

    this.token = this.activatedRoute.snapshot.queryParamMap.get('token')!;
  }

  ngOnDestroy(): void {
    this.loadingSubs?.unsubscribe();
  }

  onSubmit() {
    if(this.resetPassForm.valid) {
      const password = this.resetPassForm.get('password')?.value;
      const confirmPassword = this.resetPassForm.get('confirmPassword')?.value;
      this.store.dispatch(fromAuth.AuthActions.resetPassword({
        request: {
          token: this.token,
          password,
          confirmPassword
        } 
      }));
    }
  }

  private createForm() {
    return new FormGroup(
      {
        'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
        'confirmPassword': new FormControl(null, [
          Validators.required, 
          RxwebValidators.compare({ fieldName: 'password' })
        ])
      },
      {
        updateOn: "change"
      }
    );
  }
}