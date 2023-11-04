import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromAuth from '@app/core/store/auth';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'auth-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit{
  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.queryParamMap.get('token')!;
    this.store.dispatch(fromAuth.AuthActions.verifyEmail({request: {token}}));
  }
}