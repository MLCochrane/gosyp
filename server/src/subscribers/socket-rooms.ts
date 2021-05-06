import type { Server } from 'socket.io';
import { Container } from 'typedi';
import type { Logger } from 'winston';
import { ExtendedSocket } from 'types/global.d';
import Events from './socket-event-names';
import RoomService, { RoomRecordObjectInterface } from '../services/room-service';

export async function updateRoom(
  event: Events.userJoined | Events.userLeft,
  roomID: string,
  socket: ExtendedSocket,
  roomService: RoomService,
  io: Server,
  addToRoom: boolean,
): Promise<void> {
  // Update room number and send room detail update
  const roomDetails = await roomService.UpdateRoomUsers(roomID, addToRoom);
  if (typeof roomDetails === 'boolean') return;

  // Send room detail updates to erybody
  io.to(roomID).emit(Events.updatedRoomInfo, {
    roomDetails,
  });

  const userResponse: ResponseInterface = {
    status: 'success',
    data: {
      userAction: {
        user: {
          id: socket.id,
          nickname: socket.nickname,
        },
        timestamp: Date.now(),
      },
    },
  };

  // Let everyone else know they're in the room
  io.to(roomID).emit(event, userResponse);
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
): void {
  socket.on(Events.socketRequestsRoom, async (requestBody) => {
    const roomID = requestBody['room-id'];
    logger.info(`socket requests room access: ${roomID}`);

    /**
     * Check for room in DB
     */
    const room = await roomService.CheckForRoom(roomID);

    // Simply tell the socket there's no room
    if (!room) {
      const deniedResponse: ResponseInterface = {
        status: 'failure',
        data: {
          message: 'Room ID is not available',
        },
      };

      socket.emit(Events.addUserToRoom, deniedResponse);
      return;
    }

    // If no errors, add the user to the room
    socket.join(roomID);
    // eslint-disable-next-line no-param-reassign
    socket.nickname = requestBody.nickname || null;
    // Tell client they've been included
    const successResponse: ResponseInterface = {
      status: 'success',
      data: {
        roomID,
      },
    };
    socket.emit(Events.addUserToRoom, successResponse);

    await updateRoom(
      Events.userJoined,
      roomID,
      socket,
      roomService,
      io,
      true,
    );
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
): void {
  socket.on(Events.socketRequestsLeaveRoom, async (roomID: string) => {
    logger.info(`socket wants to leave room: ${roomID}`);

    /**
     * Check for room in DB
     */
    const roomExists = await roomService.CheckForRoom(roomID);
    const socketInRoom = socket.rooms.has(roomID);

    // socket trying to leave invalid room
    if (!roomExists || !socketInRoom) {
      return;
    }

    // If no errors, add the user to the room
    socket.leave(roomID);

    // Tell client they've been removed
    socket.emit(Events.userRemovedFromRoom, true);
    socket.emit(Events.addUserToRoom, false, roomID);

    await updateRoom(
      Events.userLeft,
      roomID,
      socket,
      roomService,
      io,
      false,
    );
  });
}

/**
 * Sent from client to create new room.
 */
export function socketCreateRoom(
  socket: ExtendedSocket,
  roomService: RoomService,
  logger: Logger,
): void {
  socket.on(Events.socketCreateRoom, async (requestBody) => {
    const { name, nickname }: {name: string, nickname: string} = requestBody;
    let freshRoom: RoomRecordObjectInterface;
    try {
      freshRoom = await roomService.CreateRoom(name) as RoomRecordObjectInterface;
      // Add on user nickname
      freshRoom.nickname = nickname;
      const response: ResponseInterface = {
        status: 'success',
        data: {
          room: {
            ...freshRoom,
          },
        },
      };
      socket.emit(Events.createRoomSuccess, response);
    } catch (err) {
      logger.info(err);
      const response: ResponseInterface = {
        status: 'error',
        data: {
          message: err,
        },
      };

      socket.emit(Events.createRoomSuccess, response);
    }
  });
}

export default function socketRooms({
  socket,
}: {
  socket: ExtendedSocket,
}): void {
  const logger: Logger = Container.get('logger');
  const roomService = Container.get(RoomService);
  const io: Server = Container.get('io');

  socketRequestsRoom(socket, roomService, logger, io);
  socketLeavesRoom(socket, roomService, logger, io);
  socketCreateRoom(socket, roomService, logger);
}
