import { Container } from 'typedi';
import IOServer, { Server } from 'socket.io';
import winston, { Logger } from 'winston';
import RoomService from '../services/room-service';
import socketRooms, {
  socketCreateRoom,
  socketRequestsRoom,
} from './socket-rooms';
import { ExtendedSocket } from '../types/global';

jest.mock('socket.io', () => {
  const socket = {
    id: '123',
    nickname: '',
    emit: jest.fn(),
    on: jest.fn(),
  };
  const on = () => socket;
  const to = jest.fn();
  const emit = jest.fn();
  return jest.fn(() => ({ on, to, emit }));
});

jest.mock('winston', () => {
  const info = jest.fn();
  const createLogger = () => ({ info });
  return {
    createLogger,
  };
});

jest.mock('../services/room-service', () => ({
  createRoom: jest.fn(),
}));

let mockedSocket: ExtendedSocket;
const mockedIO = new IOServer() as jest.Mocked<Server>;
const mockedLogger = winston.createLogger() as jest.Mocked<Logger>;
// const mockedRoomService = new RoomService();

describe('Room CRUD', () => {
  beforeAll(() => {
    Container.set('io', mockedIO);
    Container.set('logger', mockedLogger);
    Container.set('roomName', '12345');

    mockedSocket = (mockedIO.on as jest.Mock)();

    /**
     * Needed because the socket.io calls allow for chaining.
     * Probably could move into our initial mock but I haven't.
     */
    (mockedIO?.to as jest.Mock).mockImplementation(() => mockedIO);
  });

  it('calls each socket funciton to bind', () => {
    const userSocket = mockedSocket as ExtendedSocket;
    (userSocket.on as jest.Mock).mockImplementationOnce((event, cb) => {
      switch (event) {
        case 'addMeToRoom':
          return cb({});
        case 'createRoom':
          return cb({});
        default:
          return cb(null);
      }
    });
    socketRooms({ socket: userSocket });

    expect(userSocket.on).toBeCalledTimes(2);
    expect((userSocket.on as any).mock.calls).toEqual(
      [
        ['addMeToRoom', expect.anything()],
        ['createRoom', expect.anything()],
      ],
    );
  });

  // it('sends error to socket if it cant create room', () => {
  //   const userSocket = mockedSocket as ExtendedSocket;
  //   (userSocket.on as jest.Mock).mockImplementationOnce((event, cb) => {
  //     switch (event) {
  //       case 'userTyping':
  //         return cb(true);
  //       case 'chatMessage':
  //         return cb('Message');
  //       default:
  //         return cb(null);
  //     }
  //   });
  // });
});
