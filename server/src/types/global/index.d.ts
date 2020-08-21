import type { Socket } from 'socket.io';

declare module NodeJS {
  interface Global {
    appRoot: string;
  }
}

export interface ExtendedSocket extends Socket {
  nickname: string;
}
