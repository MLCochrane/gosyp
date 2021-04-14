import type { Server } from 'socket.io';
import { Container } from 'typedi';
import type { Logger } from 'winston';
import { ExtendedSocket } from 'types/global.d';
import Events from './socket-event-names';
import RoomService from '../services/room-service';
import { updateRoom } from './socket-rooms';

export default function socketLifecycle({
  socket,
}: {
  socket: ExtendedSocket,
}): void {
  const logger: Logger = Container.get('logger');
  const io: Server = Container.get('io');
  const roomService = Container.get(RoomService);

  // When a socket disonnects...
  socket.on('disconnecting', async () => {
    logger.info('socket has disconnected');

    /**
     * Check if room set in container. User can
     * disconnect without being in a room so we
     * need to check.
     */

    if (socket.rooms.size === 0 || socket.rooms == null) return;
    const rooms = Array.from(socket.rooms);

    // Filters out sockets default room and updates any others they are in
    rooms.filter((id) => id !== socket.id).forEach(async (roomID) => {
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
