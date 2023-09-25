import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router, Event} from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Observable, count, filter, map, switchMap, of, tap, defaultIfEmpty} from 'rxjs';

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
    initFlowbite();

    // this.displayLayout$ = this.router.events.pipe(
    //   filter((event: Event) => event instanceof NavigationStart),
    //   map(event => event as NavigationStart),
    //   switchMap((event) => {
    //     const show = !event.url.startsWith('/auth');
    //     return of(show);
    //   })
    // );

    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationStart),
      map(event => event as NavigationStart)
    ).subscribe(event => {
      console.log("how many times");
      this.displayLayout = !event.url.startsWith('/auth');
    });
  }

  a(): boolean {
    return !this.router.url.startsWith('/auth');
  }
}
