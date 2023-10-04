import { Directive, ElementRef, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subject, fromEvent, map, takeUntil, tap } from "rxjs";

@Directive({
  selector: 'form[formAction]'
})
export class FormActionDirective implements OnInit, OnDestroy {

  private submit = new Subject<Event | null>();
  private destroy = new Subject<void>();
  
  formElement: HTMLFormElement;
  submit$: Observable<Event | null>;
  reset$: Observable<Event>;

  constructor(private host: ElementRef<HTMLFormElement>) {
    this.formElement = this.host.nativeElement;
    this.submit$ = this.submit.asObservable();
    this.reset$ = fromEvent(this.formElement, 'reset')
      .pipe(
        tap(() => this.submit.next(null))
      );
  }

  ngOnInit(): void {
    fromEvent(this.formElement, 'submit')
      .pipe(
        takeUntil(this.destroy),
      )
      .subscribe(this.submit);
  }

  ngOnDestroy(): void {
    this.destroy.next();
  }

}