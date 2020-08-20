import type { Server, Socket } from 'socket.io';
import { Container } from 'typedi';
import type { Logger } from 'winston';
import Events from './socket-event-names';

export default function socketRooms({
  socket,
  room,
}: {
  socket: Socket,
  room: string,
}) {
  const logger: Logger = Container.get('logger');
  const io: Server = Container.get('io');

  // Adds socket to room and notifies room.
  socket.on('addMeToRoom', () => {
    logger.info('socket requests room access');
    let currentRoom = io.sockets.adapter.rooms[room];
    logger.info(currentRoom ? Object.keys(currentRoom) : `room: ${room} doesn't exist.`);

    // Some additional checks could be added here?
    socket.join(room, () => {
      if (!currentRoom) currentRoom = io.sockets.adapter.rooms[room];
      // Tell client we're included
      socket.emit('addedToRoom', true);
      logger.info(currentRoom.length);
      // Let everyone else know we're in the room
      socket.broadcast.to(room).emit(Events.userJoined, {
        user: socket.id,
        timestamp: Date.now(),
      });
    });
  });
}
