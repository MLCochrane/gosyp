import type { Express } from 'express';
import expressLoader from './express';
import Logger from './logger';
import dependencyInjector from './dependencyInjector';

export default async ({ expressApp }: { expressApp: Express }) => {
  await dependencyInjector();
  Logger.info('✌️ DI loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
