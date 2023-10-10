import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromAuth from '@app/core/store/auth';
import { Observable, Subscription, take } from "rxjs";

@Component({
  selector: 'header-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserMenuComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private isLoggedSubs?: Subscription;
  
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoggedSubs = this.store.select(fromAuth.AuthSelectors.selectAuthIsAuthenticated).subscribe(
      (isLogged) => {
        console.log("Sim logado?", isLogged);
        this.isLoggedIn = isLogged;
      });
  }

  ngOnDestroy(): void {
    this.isLoggedSubs?.unsubscribe();
  }
}