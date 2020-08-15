import type { Server, Socket } from 'socket.io';
import { Container } from 'typedi';
import type { Logger } from 'winston';
import Events from './socket-event-names';

export default function socketClientMessages({
  socket,
  room,
}: {
  socket: Socket,
  room: string,
}) {
  const logger: Logger = Container.get('logger');
  const io: Server = Container.get('io');

  // Default chat message
  socket.on(Events.chatMessage, (msg) => {
    logger.info(msg);
    io.to(room).emit(msg); // broadcast to everyone in the room
  });
}
