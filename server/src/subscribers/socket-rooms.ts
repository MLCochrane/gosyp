import type { Server } from 'socket.io';
import { Container } from 'typedi';
import type { Logger } from 'winston';
import Events from './socket-event-names';
import RoomService from '../services/room-service';
import { ExtendedSocket } from '../types/global';

export async function updateRoom(
  event: Events.userJoined | Events.userLeft,
  roomID: string,
  socket: ExtendedSocket,
  roomService: RoomService,
  io: Server,
  addToRoom: boolean,
) {
  // Update room number and send room detail update
  const roomDetails = await roomService.UpdateRoomUsers(roomID, addToRoom);
  if (typeof roomDetails === 'boolean') return;

  // Send room detail updates to erybody
  io.to(roomID).emit(Events.updatedRoomInfo, {
    roomDetails,
  });

  // Let everyone else know they're in the room
  io.to(roomID).emit(event, {
    user: {
      id: socket.id,
      nickname: socket.nickname,
    },
    timestamp: Date.now(),
  });
}

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
    const roomID = requestBody['room-id'];
    logger.info(`socket requests room access: ${roomID}`);

    /**
     * Check for room in DB
     */
    const room = await roomService.CheckForRoom(roomID);

    // Simply tell the socket there's no room
    if (!room) {
      socket.emit(Events.socketDeniedRoomAccess, {
        // redundant to return true here
        status: true,
        message: 'Room ID is not available',
      });
      return;
    }

    // If no errors, add the user to the room
    socket.join(roomID, async () => {
      // eslint-disable-next-line no-param-reassign
      socket.nickname = requestBody.nickname || null;
      // Tell client they've been included
      socket.emit(Events.addUserToRoom, true);

      console.table(socket.rooms);

      await updateRoom(
        Events.userJoined,
        roomID,
        socket,
        roomService,
        io,
        true,
      );
    });
  });
}

/**
 * Sent from client to leave a room.
 */
export function socketLeavesRoom(
  socket: ExtendedSocket,
  roomService: RoomService,
  logger: Logger,
  io: Server,
) {
  socket.on(Events.socketRequestsLeaveRoom, async (requestBody) => {
    const roomID = requestBody['room-id'];
    logger.info(`socket wants to leave room: ${roomID}`);

    /**
     * Check for room in DB
     */
    const roomExists = await roomService.CheckForRoom(roomID);
    const socketInRoom = socket.rooms[roomID.toString()];

    // socket trying to leave invalid room
    if (!roomExists || !socketInRoom) {
      return;
    }

    // If no errors, add the user to the room
    socket.leave(roomID, async () => {
      // Tell client they've been removed
      socket.emit(Events.userRemovedFromRoom, true);

      await updateRoom(
        Events.userLeft,
        roomID,
        socket,
        roomService,
        io,
        false,
      );
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
  socket.on(Events.socketCreateRoom, async (requestBody) => {
    const { name, nickname } = requestBody;
    let freshRoom;
    try {
      freshRoom = await roomService.CreateRoom(name);
      // Add on user nickname
      freshRoom.nickname = nickname;
      socket.emit(Events.createRoomSuccess, {
        message: freshRoom,
      });

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
  socketLeavesRoom(socket, roomService, logger, io);
  socketCreateRoom(socket, roomService, logger);
}
