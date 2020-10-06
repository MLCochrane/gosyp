import type { Server } from 'socket.io';
import { Container } from 'typedi';
import type { Logger } from 'winston';
import Events from './socket-event-names';
import { ExtendedSocket } from '../types/global';

/**
 * Defauilt chat message.
 */
export function chatMessage(
  socket: ExtendedSocket,
  logger: Logger,
  io: Server,
) {
  socket.on(Events.chatMessage, (msg: string) => {
    const room: string = Container.get('roomUuid');

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
      user: {
        id: socket.id,
        nickname: socket.nickname,
      },
    });
  });
}

/**
 * Sent from client when main text field detects user input.
 */
export function userTyping(
  socket: ExtendedSocket,
  logger: Logger,
) {
  socket.on(Events.userTyping, (isTyping: Boolean) => {
    const room: string = Container.get('roomUuid');
    logger.info(`Someone typing: ${isTyping}`);

    // broadcast to others in the room
    socket.broadcast.to(room).emit(Events.userTyping, isTyping);
  });
}

export default function socketClientMessages({
  socket,
}: {
  socket: ExtendedSocket,
}) {
  const logger: Logger = Container.get('logger');
  const io: Server = Container.get('io');

  // Separating events and calling here so it's easier to test each one
  chatMessage(socket, logger, io);
  userTyping(socket, logger);
}
