import type { Express } from 'express';
import type { Server } from 'http';
import expressLoader from './express';
import socketLoader from './socketio';
import mongooseLoader from './mongoose';
import Logger from './logger';
import dependencyInjector from './dependencyInjector';
import eventManager from './events';
import models from '../models';

export default async ({
  expressApp,
  httpServer,
}: {
  expressApp: Express;
  httpServer: Server;
}) => {
  const mongoConnection = await mongooseLoader();
  const ioServer = await socketLoader({ httpServer });
  Logger.info('SocketIO initialized');

  await dependencyInjector(
    ioServer,
    mongoConnection,
    models,
  );

  Logger.info('DI loaded');

  await expressLoader({ app: expressApp });
  Logger.info('Express loaded');

  eventManager();
  Logger.info('Attaching socket event listeners');
};
