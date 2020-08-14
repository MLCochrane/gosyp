import type { Application } from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import routes from '../api';
// import config from '../config';
export default ({ app }: { app: Application }) => {
  app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
  });
};
