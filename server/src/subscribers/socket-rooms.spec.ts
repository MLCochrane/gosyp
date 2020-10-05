import { Container } from 'typedi';
import IOServer, { Server } from 'socket.io';
import winston, { Logger } from 'winston';
import RoomService from '../services/room-service';
import socketRooms, {
  socketCreateRoom,
  socketRequestsRoom,
} from './socket-rooms';
import RoomModel from '../models/room';
import { ExtendedSocket } from '../types/global';

jest.mock('../models/room');
jest.mock('socket.io');
jest.mock('winston');
jest.mock('../services/room-service');

let mockedSocket: ExtendedSocket;
const mockedIO = new IOServer() as jest.Mocked<Server>;
const mockedLogger = winston.createLogger() as jest.Mocked<Logger>;
const mockedRoomService = new RoomService(RoomModel) as jest.Mocked<RoomService>;

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls each socket funciton to bind', () => {
    const userSocket = mockedSocket as ExtendedSocket;
    (userSocket.on as jest.Mock).mockImplementation((event, cb) => {
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

  it('sends error to socket if it cant create room', () => {
    const userSocket = mockedSocket as ExtendedSocket;
    (userSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb({ name: 'room-name' }));
    (mockedRoomService.CreateRoom as jest.Mock).mockImplementationOnce(() => { throw new Error('Room exists'); });

    socketCreateRoom(userSocket, mockedRoomService, mockedLogger);
    expect(userSocket.emit).toHaveBeenCalledWith('createRoomError', {
      message: Error('Room exists'),
    });
  });

  it('sends success message to socket with room created', async () => {
    const userSocket = mockedSocket as ExtendedSocket;
    (mockedRoomService.CreateRoom as jest.Mock).mockResolvedValue({
      uuid: '123',
      name: 'room-name',
      userCount: 0,
    });
    (userSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb({ name: 'room-name' }));

    await socketCreateRoom(userSocket, mockedRoomService, mockedLogger);
    expect(userSocket.emit).toHaveBeenCalledTimes(1);
  });
});
