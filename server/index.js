import express from 'express';
import morgan from 'morgan';

import { Server } from 'socket.io';
import { createServer } from 'node:http';

const PORT = process.env.PORT ?? 3001;
const app = express();

const server = createServer(app);
const io = new Server(server);

io.on('connection', () => {
  console.log('a user has connected!');
});

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(PORT, () => {
  console.log(`Express listening on port http://localhost:${PORT}`);
});
