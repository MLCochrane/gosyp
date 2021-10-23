import mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config';

/**
 * TODO:
 * - Add error handler for failing to connect on first connection
 * - in error handler, attempt the reconnection a few times before finally
 *   considering the DB inaccessable.
 *
 * This should help for initializing docker when DB is not yet up but containers
 * have finished building.
 */
export default async (): Promise<Db> => {
  const connection = await mongoose.connect(
    config.databaseURL as string,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
    },
  );
  return connection.connection.db;
};
