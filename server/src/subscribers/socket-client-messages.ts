import type { Server } from 'socket.io';
import { Container } from 'typedi';
import { ExtendedSocket } from 'types/global.d';
import Events from './socket-event-names';

/**
 * Default chat message.
 */
export function chatMessage(
  socket: ExtendedSocket,
  io: Server,
): void {
  socket.on(Events.chatMessage, (room: string, msg: string) => {
    /*
    * Think it's best to send this even to socket who
    * wrote it so we don't have to deal with updating
    * the state differently based on who wrote the message.
    * If we didn't, we wouldn't have the id. However, because
    * the id is only used for react and we're not saving it,
    * perhaps we could just make the id on the frontend?
    */
    const response: ResponseInterface = {
      status: 'success',
      data: {
        id: (Math.random() + 1).toString(36).substring(7),
        timestamp: Date.now(),
        msg,
        user: {
          id: socket.id,
          nickname: socket.nickname,
        },
      },
    };

    io.to(room).emit(Events.chatMessage, response);
  });
}

/**
 * Sent from client when main text field detects user input.
 */
export function userTyping(
  socket: ExtendedSocket,
): void {
  socket.on(Events.userTyping, (room: string, isTyping: boolean) => {
    const response: ResponseInterface = {
      status: 'success',
      data: {
        isTyping,
      },
    };
    // broadcast to others in the room
    socket.broadcast.to(room).emit(Events.userTyping, response);
  });
}

export default function socketClientMessages({
  socket,
}: {
  socket: ExtendedSocket,
}): void {
  const io: Server = Container.get('io');

  // Separating events and calling here so it's easier to test each one
  chatMessage(socket, io);
  userTyping(socket);
}
