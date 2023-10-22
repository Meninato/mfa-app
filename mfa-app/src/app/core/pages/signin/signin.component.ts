import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as fromAuth from '@app/core/store/auth';
import { Subscription } from "rxjs";

interface IAuthCredentials {
  email: string;
  password: string;
}

@Component({
  selector: 'auth-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit, OnDestroy {
  signInForm!: FormGroup;
  isLoading: boolean = false;

  private loadingSubs?: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.signInForm = this.createForm();
    this.loadingSubs = this.store.select(fromAuth.AuthSelectors.selectAuthIsLoading).subscribe(
      (loading) => this.isLoading = loading
    );
  }

  ngOnDestroy(): void {
    this.loadingSubs?.unsubscribe();
  }

  onSubmit() {
    if(this.signInForm.valid) {
      const credentials = this.getCredentials();
      this.store.dispatch(fromAuth.AuthActions.login({request: credentials}));
    } 
  }

  private getCredentials(): IAuthCredentials {
    return {
      email: this.signInForm.get('email')?.value,
      password: this.signInForm.get('password')?.value
    };
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