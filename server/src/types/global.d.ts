import type { Socket } from 'socket.io';

export interface ExtendedSocket extends Socket {
  nickname?: string;
}
