import type { Server, Socket } from 'socket.io';
import { Container } from 'typedi';
import type { Logger } from 'winston';
import Events from './socket-event-names';

export default function socketLifecylce({
  socket,
  room,
}: {
  socket: Socket,
  room: string,
}) {
  const logger: Logger = Container.get('logger');
  const io: Server = Container.get('io');

  // Adds socket to room and notifies room.
  socket.join(room, () => {
    socket.broadcast.to(room).emit(Events.userJoined, {
      user: socket.id,
    });
  });

  // When a socket disonnects...
  socket.on('disconnect', () => {
    logger.info('user disconnected');
    io.to(room).emit(Events.userLeft, {
      user: socket.id,
    });
  });
}
