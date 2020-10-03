import { Db } from 'mongodb';
import type { Server } from 'socket.io';
import { Container } from 'typedi';
import LoggerInstance from './logger';
import { IModelArray } from '../types/global';

export default (
  SocketServer: Server,
  MongoDB: Db,
  models: IModelArray[],
) => {
  Container.set('logger', LoggerInstance);
  LoggerInstance.info('✌️ Logger injected into container');

  Container.set('io', SocketServer);
  LoggerInstance.info('✌️ Socket server injected into container');

  Container.set('Db', MongoDB);
  LoggerInstance.info('✌️ Db injected into container');

  models.forEach((el) => {
    Container.set(el.name, el.model);
  });
  LoggerInstance.info('✌️ Models injected into container');
};
