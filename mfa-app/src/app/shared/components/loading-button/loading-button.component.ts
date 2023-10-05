import { Component, Input, Output, ViewEncapsulation } from "@angular/core";
import { Subject } from "rxjs";

type ButtonTypes = 'button' | 'submit';

@Component({
  selector: '[loading-button]',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingButtonComponent {
  @Input() isLoading = false;
  @Input() fullSize = true;
  @Input() text = 'Clique aqui';
  @Input() loadingText = 'Processando...';
  @Input() buttonType: ButtonTypes  = 'submit';
  @Output() buttonClicked = new Subject<void>();

  constructor() { }

  onButtonClicked() {
    this.buttonClicked.next();
  }
}