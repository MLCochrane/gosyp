import axios from 'axios';
import io from 'socket.io-client';

let url;
if (process.env.NODE_ENV === 'production') {
  url = '';
} else {
  url = 'localhost:3000';
}

const api = axios.create({
  baseURL: url,
});

const socket = io(url, { transports: ['websocket', 'polling'] });

export {
  api,
  socket,
};
