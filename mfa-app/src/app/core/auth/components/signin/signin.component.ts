import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoadingButtonComponent } from "@app/shared/components/loading-button/loading-button.component";
import { Observable, finalize, take } from "rxjs";

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
  @ViewChild(LoadingButtonComponent) submitButton!: LoadingButtonComponent;
  
  signInForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.signInForm = this.createForm();
  }

  onSubmit() {
    if(this.signInForm.valid) {
      console.log("valido");
      this.test().pipe(take(1)).subscribe();
    } else {
      console.log("inválido");
    }
  }

  test(): Observable<void> {
    this.submitButton.loading = true;
    return new Observable<void>(subscriber => {
      setTimeout(() => { subscriber.complete() }, 5000);
    }).pipe(finalize(() => this.submitButton.loading = false ));
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