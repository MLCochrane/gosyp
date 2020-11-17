import axios from 'axios';
import io from 'socket.io-client';

let url;
if (process.env.NODE_ENV === 'test') {
  url = '';
} else {
  url = process.env.REACT_APP_SERVER_URL;
}

const api = axios.create({
  baseURL: url,
});

const socket = io(url as string);

export {
  api,
  socket,
};
