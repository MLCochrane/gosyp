import type { Server } from 'http';
import { Server as SocketServer } from 'socket.io';
import config from '../config';

export default async ({ httpServer }: { httpServer: Server }): Promise<SocketServer> => {
  const io = new SocketServer(httpServer, {
    cors: {
      origin: config.frontendUrl,
      methods: ['GET', 'POST'],
    },
  });
  return io;
};
