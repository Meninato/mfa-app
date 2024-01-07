import { Injectable } from "@angular/core";
import { HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { RetryForeverPolicy } from "./retry-forever-policy";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrucoService {
  private gameConnection?: HubConnection; 
  messageStream = new Subject<string>();
  
  constructor() {

  }

  startConnection() {

    //TODO: flag to indicate the connection is success made
    this.gameConnection = this.createConnection();
    this.gameConnection.start()
      .catch(err => console.log(err));
  }

  stopConnection() {
    this.gameConnection?.stop().catch(err => console.log(err));
  }

  joinRandomGame() {
    this.gameConnection?.invoke("JoinGame").catch(err => console.log(err));
  }

  private createConnection(): HubConnection {
    const conn = new HubConnectionBuilder()
      .withUrl("http://localhost:4000/hubs/games/truco")
      .withAutomaticReconnect(new RetryForeverPolicy())
      .build();

    conn.on("WriteMessage", this.writeMessage);

    conn.onreconnecting(() => {
      this.writeMessage("Connection dropped. Attempting to reconnect...");
    });

    conn.onclose(() => {
      this.writeMessage("Reconnect attempts failed. Please refresh the page to reconnect");
    });

    conn.onreconnected(() => {
      this.writeMessage("Successfully reconnected");
    });

    return conn;
  }

  private writeMessage(msg: string) {
    console.log(msg);
    this.messageStream.next(msg);
  }
}