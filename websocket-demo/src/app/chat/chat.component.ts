import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { WebsocketService } from '../websocket-service.service';

@Component({
  selector: 'chat-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  messages: string[] = [];
  messageToSend: string = '';

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
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