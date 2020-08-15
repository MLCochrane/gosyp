import { Container } from 'typedi';
import type { Server, Socket } from 'socket.io';
import type { Logger } from 'winston';
import socketLifecycle from './socket-lifecycle';
import socketClientMessages from './socket-client-messages';

export default function DefaultSocket() {
  const logger: Logger = Container.get('logger');
  const io: Server = Container.get('io');

  io.on('connection', (socket: Socket) => {
    // This will be the initial connection.
    // Define logic for specifiying which room to add the user to.
    const roomName = 'room237';
    logger.info('user connected');

    socketLifecycle({
      socket,
      room: roomName,
    });

    socketClientMessages({
      socket,
      room: roomName,
    });
  });
}

// Will need to events: create room, join room
// If creating room, generate UUID on server taking optional nickname, have socket join that room
// If joining room, ask for UUID of room, somehow check if it exists and if it does have them join

// Need events for: when joining, leaving, typing, messages, setting nicknames
