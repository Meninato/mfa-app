import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromAuth from '@app/core/store/auth';
import { Subscription } from "rxjs";
import { AuthUser } from "@app/core/models/api/account.model";

@Component({
  selector: '[header-user-menu]',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserMenuComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  user: AuthUser | null = null;

  private subscription?: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscription = this.store.select(fromAuth.AuthSelectors.selectAuthUser).subscribe(
      (user) => {
        this.isLoggedIn = !!user;
        this.user = user;
      });
  }

  onSignout() {
    this.store.dispatch(fromAuth.AuthActions.logout());
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}