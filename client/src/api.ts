import axios from 'axios';
import io from 'socket.io-client';

let url;
switch (process.env.NODE_ENV) {
  case 'development':
    url = 'localhost:3000';
    break;
  case 'production':
    url = 'api.gosyp.io';
    break;
  default:
    url = '';
    break;
}

const api = axios.create({
  baseURL: url,
});

const socket = io(url as string);

export {
  api,
  socket,
};
