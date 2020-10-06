import { Container } from 'typedi';
import IOServer, { Server } from 'socket.io';
import winston, { Logger } from 'winston';
import flushPromises from 'flush-promises';
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
    mockedSocket = (mockedIO.on as jest.Mock)();
    (mockedSocket?.to as jest.Mock).mockImplementation(() => mockedSocket);

    /**
     * Needed because the socket.io calls allow for chaining.
     * Probably could move into our initial mock but I haven't.
     */
    (mockedIO?.to as jest.Mock).mockImplementation(() => mockedIO);
  });

  beforeEach(() => {
    Container.set('io', mockedIO);
    Container.set('logger', mockedLogger);
    Container.set('roomName', '12345');
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

  it('sends error to socket if it cant create room', async () => {
    const userSocket = mockedSocket as ExtendedSocket;
    (userSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb({ name: 'room-name' }));
    (mockedRoomService.CreateRoom as jest.Mock).mockImplementationOnce(() => { throw new Error('Room exists'); });

    socketCreateRoom(userSocket, mockedRoomService, mockedLogger);
    await flushPromises();

    expect(userSocket.emit).toHaveBeenCalledWith('createRoomError', {
      message: Error('Room exists'),
    });
  });

  it('sends success message to socket with room created', async () => {
    const userSocket = mockedSocket as ExtendedSocket;
    (userSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb({ name: 'room-name' }));
    (mockedRoomService.CreateRoom as jest.Mock).mockResolvedValueOnce({
      uuid: '867',
      roomName: 'room-name',
      userCount: 0,
    });

    socketCreateRoom(userSocket, mockedRoomService, mockedLogger);
    await flushPromises();
    expect(userSocket.emit).toHaveBeenCalledTimes(1);
    expect(userSocket.emit).toHaveBeenCalledWith(
      'createRoomSuccess',
      {
        message: {
          uuid: '867',
          roomName: 'room-name',
          userCount: 0,
        },
      },
    );
  });

  it('sends denied message to socket if no room found, does not add user to room', async () => {
    const userSocket = mockedSocket as ExtendedSocket;
    (userSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb({ 'room-id': '123' }));
    (mockedRoomService.CheckForRoom as jest.Mock).mockReturnValue(false);

    socketRequestsRoom(userSocket, mockedRoomService, mockedLogger, mockedIO);
    await flushPromises();

    expect(userSocket.emit).toHaveBeenCalledTimes(1);
    expect(userSocket.emit).toHaveBeenCalledWith(
      'notAddedToRoom',
      {
        status: true,
        message: 'Room ID is not available',
      },
    );
    expect(userSocket.join).toHaveBeenCalledTimes(0);
  });

  it('if a room found add socket, send room details to everyone, and tell room someone joined', async () => {
    const roomDetails = [
      {
        name: 'Room ID',
        value: '12345',
      },
      {
        name: 'Room Name',
        value: '',
      },
      {
        name: 'Created At',
        value: 'Thursday',
      },
      {
        name: 'Active users',
        value: 0,
      },
    ];
    const userSocket = mockedSocket as ExtendedSocket;
    (userSocket.broadcast as any) = userSocket;
    (userSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb({ 'room-id': '583' }));
    (userSocket.join as jest.Mock).mockImplementationOnce((event, cb) => cb());
    (mockedRoomService.CheckForRoom as jest.Mock).mockReturnValue(true);
    (mockedRoomService.UpdateRoomUsers as jest.Mock).mockReturnValue(roomDetails);

    socketRequestsRoom(userSocket, mockedRoomService, mockedLogger, mockedIO);
    await flushPromises();

    expect(userSocket.join).toHaveBeenCalledWith('12345', expect.anything());
    expect((userSocket.emit as jest.Mock).mock.calls).toEqual([
      ['addedToRoom', true],
      ['userJoined', expect.objectContaining({
        user: {
          id: '123',
          nickname: null,
        },
      })],
    ]);
    expect(mockedIO.to).toHaveBeenCalledWith('12345');
    expect(mockedIO.emit).toHaveBeenCalledWith(
      'updatedRoomInfo',
      { roomDetails },
    );
  });
});
