import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketService} from './websocket-service.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  messages: string[] = [];
  messageToSend: string = '';

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    // Üzenetek fogadása
    this.websocketService.getMessages().subscribe((message) => {
      this.messages.push(message);
    });
  }

  // Üzenet küldése
  sendMessage(): void {
    this.websocketService.sendMessage(this.messageToSend);
    this.messageToSend = '';
  }
}
