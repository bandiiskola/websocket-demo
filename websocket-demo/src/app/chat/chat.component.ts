import { Component} from '@angular/core';
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
export class ChatComponent{

  name: string = '';
  message: string = '';
  selectedAvatar: string = ''; // Kiválasztott avatar
  avatars: string[] = [
    'https://steamuserimages-a.akamaihd.net/ugc/786371856221183225/2F04B32CA10AD1ADBC01CE5D4DC6F7AF0E96AE6C/?imw=512&imh=512&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true',
    'https://i.pinimg.com/736x/99/27/90/99279086833d4d0662c19f294035630b.jpg',
    'https://wallpapers-clan.com/wp-content/uploads/2022/07/funny-cat-1.jpg'
  ];

  messages: { name: string; avatar: string; message: string }[] = [];

  constructor(private websocketService: WebsocketService) {
    this.websocketService.getMessages().subscribe({
      next: (msg) => {
        try {
          const parsedMsg = JSON.parse(msg); // JSON üzenet feldolgozása
          this.messages.push(parsedMsg); // Üzenet hozzáadása a listához
        } catch (e) {
          console.error('Hibás üzenet formátum:', e);
        }
      },
      error: (error) => {
        console.error('WebSocket hiba:', error);
      },
      complete: () => {
        console.log('WebSocket kapcsolat lezárult');
      }
    });
  }

  selectAvatar(avatar: string) {
    this.selectedAvatar = avatar; // Avatar kiválasztása
  }

  sendMessage() {
    if (this.name.trim() && this.selectedAvatar && this.message.trim()) {
      const msg = {
        name: this.name,
        avatar: this.selectedAvatar,
        message: this.message
      };
      this.websocketService.sendMessage(JSON.stringify(msg)); // Üzenet küldése JSON formátumban
      this.message = ''; // Üzenet mező törlése
    } else {
      alert('Minden mezőt ki kell tölteni!');
    }
  }
}