import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromAuth from '@app/core/store/auth';
import { Subscription } from "rxjs";
import { initDropdowns } from "flowbite";

@Component({
  selector: '[header-user-menu]',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserMenuComponent implements OnInit, OnDestroy, AfterViewInit {
  isLoggedIn = false;
  private isLoggedSubs?: Subscription;
  
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isLoggedSubs = this.store.select(fromAuth.AuthSelectors.selectAuthIsAuthenticated).subscribe(
      (isLogged) => {
        this.isLoggedIn = isLogged;
      });
  }

  ngAfterViewInit(): void {
    initDropdowns();
  }

  ngOnDestroy(): void {
    this.isLoggedSubs?.unsubscribe();
  }
}