import type { Server } from 'http';
import IOServer from 'socket.io';

export default async ({ httpServer }: { httpServer: Server }) => {
  const io = new IOServer(httpServer, {
    cors: {
      origin: 'https://gosyp.io',
      methods: ['GET', 'POST'],
    },
  });
  // can add middleware with io.use((socket, next) => {});
  // https://socket.io/docs/namespaces/
  return io;
};
