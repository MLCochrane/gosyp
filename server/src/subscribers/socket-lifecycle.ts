import type { Server } from 'socket.io';
import { Container } from 'typedi';
import type { Logger } from 'winston';
import Events from './socket-event-names';
import { ExtendedSocket } from '../types/global';

export default function socketLifecylce({
  socket,
  room,
}: {
  socket: ExtendedSocket,
  room: string,
}) {
  const logger: Logger = Container.get('logger');
  const io: Server = Container.get('io');

  // When a socket disonnects...
  socket.on('disconnect', () => {
    logger.info('socket has disconnected');
    io.to(room).emit(Events.userLeft, {
      user: {
        id: socket.id,
        nickname: socket.nickname,
      },
      timestamp: Date.now(),
    });

    // Update Room details, remove room in service if userCount = 0
  });
}
