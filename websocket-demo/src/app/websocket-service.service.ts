import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private ws: WebSocket;

  constructor() {
    this.ws = new WebSocket('ws://localhost:3000');
    this.ws.binaryType = 'blob'; // Biztosítjuk, hogy Blob-ként kezelje a bináris adatokat
  }

  sendMessage(message: string) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    }
  }

  getMessages(): Observable<string> {
    return new Observable((observer) => {
      this.ws.onmessage = async (event) => {
        let data: string;

        if (event.data instanceof Blob) {
          // Ha Blob formátumban érkezik, alakítsuk át szöveggé
          data = await event.data.text();
        } else {
          // Ha nem Blob, akkor már szöveges formátumban érkezett
          data = event.data;
        }

        observer.next(data);
      };

      this.ws.onerror = (error) => {
        observer.error(error);
      };

      this.ws.onclose = () => {
        observer.complete();
      };
    });
  }
}
