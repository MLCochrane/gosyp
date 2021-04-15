import { Container } from 'typedi';
import type { Server } from 'socket.io';
import type { Logger } from 'winston';
import { ExtendedSocket } from 'types/global.d';
import socketLifecycle from './socket-lifecycle';
import socketRooms from './socket-rooms';
import socketClientMessages from './socket-client-messages';

export default function DefaultSocket(): void {
  const logger: Logger = Container.get('logger');
  const io: Server = Container.get('io');

  io.on('connection', (socket: ExtendedSocket) => {
    // This will be the initial connection.
    logger.info('socket has connected');

    socketLifecycle({
      socket,
    });

    socketRooms({
      socket,
    });

    socketClientMessages({
      socket,
    });
  });
}
