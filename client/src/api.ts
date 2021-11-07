import axios from 'axios';
import io from 'socket.io-client';

let url;
if (process.env.REACT_APP_IS_DOCKER) {
  url = 'node:3000';
} else {
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
}

const api = axios.create({
  baseURL: url,
});

const socket = io(url as string);

export {
  api,
  socket,
};
