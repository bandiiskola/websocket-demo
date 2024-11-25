const WebSocket = require('ws');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({server});

wss.on('connection', ws => {
    console.log('Új WebSocket kapcsolat');

    ws.on('Kapott üzenet', message =>{
        console.log('Kapott üzenet: ',  message);
        ws.send('Szerver válasz: '+message);
    });

    ws.send('Üdvözöllek a WebSocket szerveren!');
});

server.listen(3000, () => {
    console.log('HTTP és WebSocket szerver fut a 3000-es porton');
});