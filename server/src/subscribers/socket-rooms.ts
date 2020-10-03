import { Container } from 'typedi';
import type { Logger } from 'winston';
import Events from './socket-event-names';
import RoomService from '../services/room-service';
import { ExtendedSocket } from '../types/global';

export default function socketRooms({
  socket,
}: {
  socket: ExtendedSocket,
}) {
  const logger: Logger = Container.get('logger');
  const roomService = Container.get(RoomService);

  /**
   * Socket requests room access
   *
   * Will check for room and add if the room
   * has been created already.
   *
   * Could add additional checks to rooms service
   * if need be such as additional authentication.
   */
  socket.on(Events.socketRequestsRoom, async (requestBody) => {
    logger.info('socket requests room access');
    const room: string = Container.get('roomName');

    /**
     * Check for room in DB
     */
    const roomExists = await roomService.CheckForRoom(requestBody['room-id']);

    // Simply tell the socket there's no room
    if (!roomExists) {
      logger.info(Object.keys(requestBody));
      socket.emit(Events.socketDeniedRoomAccess, {
        // redundant to return true here
        status: true,
        message: 'Room ID is not available',
      });
      return;
    }

    // Increase room number and send room detail update
    await roomService.UpdateRoomUsers(room, true);

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

  socket.on(Events.socketCreateRoom, async (requestBody) => {
    const { name } = requestBody;
    logger.info('In socket create room request');
    try {
      const freshRoom = await roomService.CreateRoom(name);
      socket.emit(Events.createRoomSuccess, {
        message: freshRoom,
      });

      Container.set('roomName', freshRoom.uuid);
    } catch (err) {
      logger.info('Inside catch block');
      logger.info(err);
      socket.emit(Events.createRoomError, {
        message: err,
      });
    }
  });
}

// let currentRoom = io.sockets.adapter.rooms[room];
