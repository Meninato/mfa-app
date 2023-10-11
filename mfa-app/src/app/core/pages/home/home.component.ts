import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from '@app/core/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(fromApp.AppActions.showAlert({options: {message: 'boneca mimada hmmmm'}}));
  }
}