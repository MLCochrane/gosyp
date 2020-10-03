import { Container } from 'typedi';
import type { Logger } from 'winston';
import Events from './socket-event-names';
import RoomService from '../services/room-service';
import { ExtendedSocket } from '../types/global';

export default function socketRooms({
  socket,
  room,
}: {
  socket: ExtendedSocket,
  room: string,
}) {
  const logger: Logger = Container.get('logger');
  const roomService = Container.get(RoomService);

  // Adds socket to room and notifies room.
  socket.on(Events.socketRequestsRoom, async (requestBody) => {
    logger.info('socket requests room access');

    /**
     * Check for room in DB
     */
    const roomExists = await roomService.CheckForRoom(requestBody['room-id']);

    if (!roomExists) {
      logger.info(Object.keys(requestBody));
      socket.emit(Events.socketDeniedRoomAccess, {
        // redundant to return true here
        status: true,
        message: 'Room ID is not available',
      });
      return;
    }

    // If no errors, add the user to the room
    socket.join(room, () => {
      // eslint-disable-next-line no-param-reassign
      socket.nickname = requestBody.nickname || null;
      // Tell client they've been included
      socket.emit(Events.addUserToRoom, true);
      // Let everyone else know they're in the room
      socket.broadcast.to(room).emit(Events.userJoined, {
        user: {
          id: socket.id,
          nickname: socket.nickname,
        },
        timestamp: Date.now(),
      });

      // Broadcast updated room details here
    });
  });
}

// let currentRoom = io.sockets.adapter.rooms[room];
