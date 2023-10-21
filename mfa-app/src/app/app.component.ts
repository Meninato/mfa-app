import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, Event} from '@angular/router';
import { Observable, filter, map, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayLayout$: Observable<boolean> = of(true);
  displayLayout: boolean = true;

  constructor(private router: Router, private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationStart),
      map(event => event as NavigationStart)
    ).subscribe(event => {
      this.displayLayout = !event.url.startsWith('/auth');
    });
  }
}
