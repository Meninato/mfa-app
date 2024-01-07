import { Component, OnDestroy, OnInit } from "@angular/core";
import { TrucoService } from "./truco.service";

@Component({
  selector: 'truco-game',
  templateUrl: './truco.component.html',
  styleUrls: ['./truco.component.css']
})
export class TrucoComponent implements OnInit, OnDestroy {

  constructor(private trucoService: TrucoService) {

  }

  ngOnInit(): void {
    this.trucoService.startConnection();
  }

  ngOnDestroy(): void {
    this.trucoService.stopConnection();
  }

  joinGame() {
    this.trucoService.joinRandomGame();
  }
}