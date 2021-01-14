import type { Application } from 'express';

export default ({ app }: { app: Application }) => {
  app.get('/', (req, res) => {
    res.sendFile(`${global.appRoot}/public/index.html`);
  });
};
