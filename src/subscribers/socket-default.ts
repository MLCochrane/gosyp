import { Container } from 'typedi';
import type { Server, Socket } from 'socket.io';
import type { Logger } from 'winston';

export default function DefaultSocket() {
  const logger: Logger = Container.get('logger');
  const io: Server = Container.get('io');

  io.on('connection', (socket: Socket) => {
    logger.info('user connected');
    socket.on('disconnect', () => {
      logger.info('user disconnected');
    });
  });
}
