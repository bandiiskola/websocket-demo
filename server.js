const WebSocket = require('ws');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    console.log('Új WebSocket kapcsolat');

    ws.on('message', (message) => {
      console.log('Kapott üzenet:', message);
  
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
  
    ws.send(JSON.stringify({ name: 'Szerver', avatar: 'https://blogtimenow.com/wp-content/uploads/2014/06/hide-facebook-profile-picture-notification.jpg', message: 'Üdvözöllek a WebSocket szerveren!' }));
}); 

server.listen(3000, () => {
  console.log('HTTP és WebSocket szerver fut a 3000-es porton');
});