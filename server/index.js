import express from 'express';
import morgan from 'morgan';

import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { Socket } from 'node:dgram';

const PORT = process.env.PORT ?? 3001;
const app = express();

const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user has connected!');
  socket.on('disconnect', () => {
    console.log('an user disconnected!');
  });

  socket.on('chat message', (message) => {
    io.emit('chat message', message);
  });
});

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(PORT, () => {
  console.log(`Express listening on port http://localhost:${PORT}`);
});
