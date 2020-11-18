import 'reflect-metadata'; // We need this in order to use @Decorators
import path from 'path';
import http from 'http';
import express from 'express';
import helmet from 'helmet';
import config from './config';
import Logger from './loaders/logger';

async function startServer() {
  global.appRoot = path.resolve(__dirname);
  const app = express();
  app.use(helmet());
  const httpServer = http.createServer(app);

  await import('./loaders').then((res) => {
    res.default({
      expressApp: app,
      httpServer,
    });
  });

  httpServer.listen(config.port, () => {
    Logger.info(`Server listening on port: ${config.port}`);
  });

  httpServer.on('error', (err: Error) => {
    Logger.error(err);
    process.exit(1);
  });
}

startServer();
