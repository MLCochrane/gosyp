import mongoose from 'mongoose';
import { Db } from 'mongodb';
import Logger from './logger';
import config from '../config';

const RETRY_COUNT = 30;

export default async (): Promise<Db> => {
  let activeRetries = 0;
  return new Promise((resolve) => setInterval(async () => {
    try {
      const connection = await mongoose.connect(
          config.databaseURL as string,
          {
            useNewUrlParser: true,
            useCreateIndex: true,
          },
      );
      resolve(connection.connection.db);
    } catch {
      if (activeRetries < RETRY_COUNT) activeRetries++;
      Logger.warn(`Retrying initial DB connection attempt: ${activeRetries}`);
      if (activeRetries === RETRY_COUNT) throw new Error(`Mongoose cannot create initial connection after ${RETRY_COUNT} retries. Check database config.`);
    }
  }, 100));
};
