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
  socket.on(Events.chatMessage, (msg: string) => {
    logger.info(msg);

    // broadcast to everyone in the room

    /*
    * Think it's best to send this even to socket who
    * wrote it so we don't have to deal with updating
    * the state differently based on who wrote the message.
    * If we didn't, we wouldn't have the id. However, because
    * the id is only used for react and we're not saving it,
    * perhaps we could just make the id on the frontend?
    */
    io.to(room).emit(Events.chatMessage, {
      id: (Math.random() + 1).toString(36).substring(7),
      timestamp: Date.now(),
      msg,
      userId: socket.id,
    });
  });

  // User typing
  socket.on(Events.userTyping, (isTyping: Boolean) => {
    logger.info(`Someone typing: ${isTyping}`);

    // broadcast to others in the room
    socket.broadcast.to(room).emit(Events.userTyping, isTyping);
  });
}
