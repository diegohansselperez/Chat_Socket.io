import express from 'express';
import morgan from 'morgan';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import { Socket } from 'node:dgram';
import dotenv from 'dotenv';
import { createClient } from '@libsql/client/.';

const PORT = process.env.PORT ?? 3001;
const app = express();

const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

const db = createClient({
  url: 'libsql://obliging-stilt-man-diegohansselperez.turso.io',
  authToken: process.env.DB_TOKEN,
});

await db.execute('CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT
)');
io.on('connection', (socket) => {
  console.log('a user has connected!');
  socket.on('disconnect', () => {
    console.log('an user disconnected!');
  });

  socket.on('chat message', (data) => {
    console.log('message:', data);
    io.emit('chat message', data);
  });
});

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(PORT, () => {
  console.log(`Express listening on port http://localhost:${PORT}`);
});
