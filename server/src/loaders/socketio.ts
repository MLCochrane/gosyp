import type { Server } from 'http';
import IOServer from 'socket.io';

export default async ({ httpServer }: { httpServer: Server }) => {
  const io = new IOServer(httpServer);
  return io;
};
