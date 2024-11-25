import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private ws: WebSocket;

  constructor() {
    this.ws = new WebSocket('ws://localhost:3000');
  }
 sendMessage(message: string) {
  if (this.ws.readyState === WebSocket.OPEN) {
    this.ws.send(message);
  }
}

getMessages(): Observable<string> {
  return new Observable((observer) => {
    this.ws.onmessage = (event) => {
      observer.next(event.data);
    };
  });
}
}