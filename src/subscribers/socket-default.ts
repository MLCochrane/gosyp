import { Container } from 'typedi';
import type { Server, Socket } from 'socket.io';
import type { Logger } from 'winston';

export default function DefaultSocket() {
  const logger: Logger = Container.get('logger');
  const io: Server = Container.get('io');

  io.on('connection', (socket: Socket) => {
    const roomName = 'room237';
    logger.info('user connected');

    // Move and group all these events on the socket to separate modules
    socket.on('disconnect', () => {
      logger.info('user disconnected');
      io.to(roomName).emit('userLeft'); // broadcast to everyone in the room
    });

    socket.on('chat message', (msg) => {
      logger.info(msg);
    });

    socket.join(roomName, () => {
      socket.broadcast.to(roomName).emit('userJoined'); // broadcast to everyone in the room
    });
  });
}

// Will need to events: create room, join room
// If creating room, generate UUID on server taking optional nickname, have socket join that room
// If joining room, ask for UUID of room, somehow check if it exists and if it does have them join

// Need events for: when joining, leaving, typing, messages, setting nicknames
