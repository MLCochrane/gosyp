import type { Server } from 'socket.io';
import { Container } from 'typedi';
import type { Logger } from 'winston';
import Events from './socket-event-names';
import RoomService from '../services/room-service';
import { ExtendedSocket } from '../types/global';

export default function socketLifecycle({
  socket,
}: {
  socket: ExtendedSocket,
}) {
  const logger: Logger = Container.get('logger');
  const io: Server = Container.get('io');
  const roomService = Container.get(RoomService);

  // When a socket disonnects...
  socket.on('disconnect', async () => {
    logger.info('socket has disconnected');

    /**
     * Check if room set in container. User can
     * disconnect without being in a room so we
     * need to check.
     */
    logger.info('about to check for room in disonnect');
    const roomCheck = Container.has('roomUuid');
    if (!roomCheck) {
      return;
    }
    logger.info('room check has passed so we can continue');

    // Get room name
    const room: string = Container.get('roomUuid');

    const roomDetails = await roomService.UpdateRoomUsers(room, false);
    /**
     * Send room details update to room
     */
    if (typeof roomDetails !== 'boolean') {
      io.to(room).emit(Events.updatedRoomInfo, {
        roomDetails,
      });

      // Updates other users to user leaving
      io.to(room).emit(Events.userLeft, {
        user: {
          id: socket.id,
          nickname: socket.nickname,
        },
        timestamp: Date.now(),
      });
    }
  });
}
