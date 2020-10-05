import type { Server } from 'socket.io';
import { Container } from 'typedi';
import type { Logger } from 'winston';
import Events from './socket-event-names';
import RoomService from '../services/room-service';
import { ExtendedSocket } from '../types/global';

/**
   * Socket requests room access
   *
   * Will check for room and add if the room
   * has been created already.
   *
   * Could add additional checks to rooms service
   * if need be such as additional authentication.
   */
export function socketRequestsRoom(
  socket: ExtendedSocket,
  roomService: RoomService,
  logger: Logger,
  io: Server,
) {
  socket.on(Events.socketRequestsRoom, async (requestBody) => {
    logger.info('socket requests room access');
    const room: string = Container.get('roomName');

    /**
     * Check for room in DB
     */
    const roomExists = await roomService.CheckForRoom(requestBody['room-id']);

    // Simply tell the socket there's no room
    if (!roomExists) {
      socket.emit(Events.socketDeniedRoomAccess, {
        // redundant to return true here
        status: true,
        message: 'Room ID is not available',
      });
      return;
    }

    // Increase room number and send room detail update
    const roomDetails = await roomService.UpdateRoomUsers(room, true);

    // If no errors, add the user to the room
    socket.join(room, () => {
      // eslint-disable-next-line no-param-reassign
      socket.nickname = requestBody.nickname || null;
      // Tell client they've been included
      socket.emit(Events.addUserToRoom, true);

      // Send room detail updates to erybody
      io.to(room).emit(Events.updatedRoomInfo, {
        roomDetails,
      });

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

/**
 * Sent from client to create new room.
 */
export function socketCreateRoom(
  socket: ExtendedSocket,
  roomService: RoomService,
  logger: Logger,
) {
  socket.on(Events.socketCreateRoom, (requestBody) => {
    const { name } = requestBody;
    try {
      const freshRoom = roomService.CreateRoom(name) as any;
      socket.emit(Events.createRoomSuccess, {
        message: freshRoom,
      });

      Container.set('roomName', freshRoom.uuid);
    } catch (err) {
      logger.info(err);
      socket.emit(Events.createRoomError, {
        message: err,
      });
    }
  });
}

export default function socketRooms({
  socket,
}: {
  socket: ExtendedSocket,
}) {
  const logger: Logger = Container.get('logger');
  const roomService = Container.get(RoomService);
  const io: Server = Container.get('io');

  socketRequestsRoom(socket, roomService, logger, io);
  socketCreateRoom(socket, roomService, logger);
}

// module.functionName(arg1, async callback(arg2) {...});
// module.fucntionName.mockImplementation((arg1, cb) => cb('some data'));
