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

  // socket.on('join', (options, cb) => {
  //   const { error, user } = addUser({ id: socket.id, ...options });

  //   if (error) {
  //     return cb(error);
  //   }

  //   socket.join(user.room);

  //   socket.emit('message', generateMsg('Admin', 'Welcome!'));
  //   socket.broadcast
  //     .to(user.room)
  //     .emit('message', generateMsg('Admin', `${user.username} has joined!`));
  //   io.to(user.room).emit('roomData', { room: user.room,
  //     users: getUsersInRoom(user.room) });

  //   cb();
  // });

  // socket.on('sendMessage', (msg, cb) => {
  //   const filter = new Filter();

  //   if (filter.isProfane(msg)) {
  //     return cb('Profanity is not allowed!');
  //   }

  //   const { room, username } = getUser(socket.id);

  //   io.to(room).emit('message', generateMsg(username, msg));
  //   cb();
  // });

  // socket.on('sendLocation', ({ latitude, longitude }, cb) => {
  //   const { room, username } = getUser(socket.id);
  //   io.to(room).emit(
  //     'locationMessage',
  //     generateLocationMsg(
  //       username,
  //       `https://google.com/maps?q=${latitude},${longitude}`,
  //     ),
  //   );
  //   cb('Location shared!');
  // });

  // socket.on('disconnect', () => {
  //   const user = removeUser(socket.id);

  //   if (user) {
  //     io.to(user.room).emit(
  //       'message',
  //       generateMsg('Admin', `${user.username} has left!`),
  //     );
  //     io.to(user.room).emit('roomData', { room: user.room,
  //       users: getUsersInRoom(user.room) });
  //   }
  // });
});

server.listen(port, () => console.log(`Server is up on port ${port}!`));