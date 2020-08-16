import type { Server } from 'socket.io';
import { Container } from 'typedi';
import LoggerInstance from './logger';

export default (SocketServer: Server) => {
  Container.set('logger', LoggerInstance);
  LoggerInstance.info('✌️ Logger injected into container');

  Container.set('io', SocketServer);
  LoggerInstance.info('✌️ Socket server injected into container');
};
