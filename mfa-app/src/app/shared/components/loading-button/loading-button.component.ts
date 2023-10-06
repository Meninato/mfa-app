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
  
  isLoading = false;
  enabledClass  = "text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800";
  disabledClass = ''

  private btnSubscription?: Subscription;

  constructor() { }

  ngOnDestroy(): void {
    this.btnSubscription?.unsubscribe();
  }

  onButtonClicked() {
    if(this.callback && this.buttonType === "button") {
      this.loading = true;
      this.btnSubscription = this.callback().pipe(
        finalize(() => this.loading = true )
      ).subscribe();
    }
  }

  set loading(value: boolean) {
    this.isLoading = value;
    this.isDisabled = value;
  }
}