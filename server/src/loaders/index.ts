import type { Server } from 'http';
import socketLoader from './socketio';
import mongooseLoader from './mongoose';
import Logger from './logger';
import dependencyInjector from './dependencyInjector';
import eventManager from './events';
import models from '../models';

export default async ({
  httpServer,
}: {
  httpServer: Server;
}): Promise<void> => {
  const mongoConnection = await mongooseLoader();
  const ioServer = await socketLoader({ httpServer });
  Logger.info('SocketIO initialized');

  await dependencyInjector(
    ioServer,
    mongoConnection,
    models,
  );

  eventManager();
  Logger.info('Attaching socket event listeners');
};
