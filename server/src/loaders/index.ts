import type { Express } from 'express';
import type { Server } from 'http';
import expressLoader from './express';
import socketLoader from './socketio';
import Logger from './logger';
import dependencyInjector from './dependencyInjector';
import eventManager from './events';

export default async ({
  expressApp,
  httpServer,
}: {
  expressApp: Express;
  httpServer: Server;
}) => {
  const ioServer = await socketLoader({ httpServer });
  Logger.info('✌️ SocketIO initialized');

  await dependencyInjector(ioServer);
  Logger.info('✌️ DI loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');

  eventManager();
  Logger.info('Attaching socket event listeners');
};
