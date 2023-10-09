import { Component, Input, OnDestroy, ViewEncapsulation } from "@angular/core";
import { Observable, Subscription, finalize } from "rxjs";

type ButtonTypes = 'button' | 'submit';

interface IButtonCallback {
  (): Observable<void> 
}

@Component({
  selector: '[loading-button]',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingButtonComponent implements OnDestroy{
  @Input() fullSize = true;
  @Input() isDisabled = false;
  @Input() text = 'Clique aqui';
  @Input() loadingText = 'Aguarde...';
  @Input() buttonType: ButtonTypes  = 'submit';
  @Input() callback: IButtonCallback | null = null;
  @Input() isLoading: boolean = false;

  private btnSubscription?: Subscription;

  constructor() { 
   
  }

  ngOnDestroy(): void {
    this.btnSubscription?.unsubscribe();
  }

  onButtonClicked() {
    if(this.callback && this.buttonType === "button") {
      this.isLoading = true;
      this.btnSubscription = this.callback().pipe(
        finalize(() => this.isLoading = true )
      ).subscribe();
    }
  }
}