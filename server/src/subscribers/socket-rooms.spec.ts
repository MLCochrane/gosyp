import { Container } from 'typedi';
import { createServer } from 'http';
import { Server } from 'socket.io';
import winston, { Logger } from 'winston';
import flushPromises from 'flush-promises';
import { ExtendedSocket } from 'types/global.d';
import RoomService from '../services/room-service';
import socketRooms, {
  socketCreateRoom,
  socketRequestsRoom,
  socketLeavesRoom,
} from './socket-rooms';
import RoomModel from '../models/room';

jest.mock('../models/room');
jest.mock('socket.io');
jest.mock('winston');
jest.mock('../services/room-service');

let mockedSocket: ExtendedSocket;
describe('Room CRUD', () => {
  const httpServer = createServer();
  const mockedIO = new Server(httpServer) as jest.Mocked<Server>;
  const mockedLogger = winston.createLogger() as jest.Mocked<Logger>;
  const mockedRoomService = new RoomService(RoomModel) as jest.Mocked<RoomService>;
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
    Container.set(RoomService, mockedRoomService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls each socket funciton to bind', () => {
    const userSocket = mockedSocket as ExtendedSocket;
    (userSocket.on as jest.Mock).mockImplementationOnce((event, cb) => {
      switch (event) {
        case 'addMeToRoom':
          return cb({});
        case 'createRoom':
          return cb({});
        case 'removeMeFromRoom':
          return cb({});
        default:
          return cb(null);
      }
    });
    socketRooms({ socket: userSocket });

    expect(userSocket.on).toBeCalledTimes(3);
    expect((userSocket.on as jest.Mock).mock.calls).toEqual(
      [
        ['addMeToRoom', expect.anything()],
        ['removeMeFromRoom', expect.anything()],
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

    expect(userSocket.emit).toHaveBeenCalledWith('createRoomSuccess', {
      status: 'error',
      data: {
        message: Error('Room exists'),
      },
    });
  });

  it('sends success message to socket with room created', async () => {
    const userSocket = mockedSocket as ExtendedSocket;
    (userSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb({ name: 'room-name' }));
    (mockedRoomService.CreateRoom as jest.Mock).mockResolvedValueOnce({
      uuid: '867',
      roomUuid: 'room-name',
      userCount: 0,
    });

    socketCreateRoom(userSocket, mockedRoomService, mockedLogger);
    await flushPromises();
    expect(userSocket.emit).toHaveBeenCalledTimes(1);
    expect(userSocket.emit).toHaveBeenCalledWith(
      'createRoomSuccess',
      {
        status: 'success',
        data: {
          room: {
            uuid: '867',
            roomUuid: 'room-name',
            userCount: 0,
          },
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
      'addedToRoom',
      {
        status: 'failure',
        data: {
          message: 'Room ID is not available',
        },
      },
    );
    expect(userSocket.join).toHaveBeenCalledTimes(0);
  });

  it('if a room found: add socket, send room details to everyone, and tell room someone joined', async () => {
    const roomDetails = [
      {
        name: 'Room ID',
        value: '583',
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
    (userSocket.broadcast as unknown) = userSocket;
    (userSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb({ 'room-id': '583' }));
    (userSocket.join as jest.Mock).mockImplementationOnce(() => null);
    (mockedRoomService.CheckForRoom as jest.Mock).mockReturnValue(true);
    (mockedRoomService.UpdateRoomUsers as jest.Mock).mockReturnValue(roomDetails);

    socketRequestsRoom(userSocket, mockedRoomService, mockedLogger, mockedIO);
    await flushPromises();

    expect(userSocket.join).toHaveBeenCalledWith('583');
    expect((userSocket.emit as jest.Mock).mock.calls).toEqual([
      ['addedToRoom', {
        status: 'success',
        data: {
          roomID: '583',
        },
      }],
    ]);
    expect(mockedIO.to).toHaveBeenCalledWith('583');
    expect(mockedIO.emit).toHaveBeenCalledWith(
      'userJoined', {
        status: 'success',
        data: {
          userAction: {
            user: {
              id: '123',
              nickname: null,
            },
            timestamp: expect.anything(),
          },
        },
      },
    );
    expect(mockedIO.emit).toHaveBeenCalledWith(
      'updatedRoomInfo',
      { roomDetails },
    );
  });

  it('sockets can leave a room and it notifies the room', async () => {
    const roomDetails = [
      {
        name: 'Room ID',
        value: '583',
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
        value: 1,
      },
    ];
    const userSocket = mockedSocket as ExtendedSocket;
    (userSocket.rooms as Set<string>) = new Set(['583']);

    (userSocket.broadcast as unknown) = userSocket;
    (userSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb('583'));
    (userSocket.leave as jest.Mock).mockImplementationOnce(() => null);
    (mockedRoomService.CheckForRoom as jest.Mock).mockReturnValue(true);
    (mockedRoomService.UpdateRoomUsers as jest.Mock).mockReturnValue(roomDetails);

    socketLeavesRoom(userSocket, mockedRoomService, mockedLogger, mockedIO);
    await flushPromises();

    expect(userSocket.leave).toHaveBeenCalledWith('583');
    expect((userSocket.emit as jest.Mock).mock.calls).toEqual([
      ['addedToRoom', {
        status: 'failure',
        data: {
          message: 'Removed from room',
        },
      }],
    ]);
    expect(mockedIO.to).toHaveBeenCalledWith('583');
    expect(mockedIO.emit).toHaveBeenNthCalledWith(
      2,
      'userLeft', {
        status: 'success',
        data: {
          userAction: {
            user: {
              id: '123',
              nickname: null,
            },
            timestamp: expect.anything(),
          },
        },
      },
    );

    expect(mockedIO.emit).toHaveBeenNthCalledWith(
      1,
      'updatedRoomInfo',
      { roomDetails },
    );
  });
});
