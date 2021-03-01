const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();

const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 8080;
const publicDirPath = path.join(__dirname, '../build');

app.use(express.static(publicDirPath));

io.on('connection', socket => {
  console.log('New webSocket connection.');

  // socket.emit - send event to specific client
  // io.emit - send event to all connected clients
  // socket.broadcast.emit - send event to all connected clients exept specific one

  // io.to.emit - send event to everybody in specific room
  // socket.broadcast.to.emit - send event to all connected clients exept specific one in specific room
});

server.listen(port, () => console.log(`Server is up on port ${port}!`));