import { Container } from 'typedi';
import { Server } from 'socket.io';
import winston, { Logger } from 'winston';
import flushPromises from 'flush-promises';
import { ExtendedSocket } from 'types/global.d';
import RoomService from '../services/room-service';
import socketLifecycle from './socket-lifecycle';
import RoomModel from '../models/room';

jest.mock('../models/room');
jest.mock('socket.io');
jest.mock('winston');
jest.mock('../services/room-service');

let mockedSocket: ExtendedSocket;
const mockedIO = new Server() as jest.Mocked<Server>;
const mockedLogger = winston.createLogger() as jest.Mocked<Logger>;
const mockedRoomService = new RoomService(RoomModel) as jest.Mocked<RoomService>;

describe('Room lifecycle', () => {
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

  it('sends room update if others in room and socket leaves', async () => {
    const roomDetailsStub: ClientRoomInterface = [
      {
        name: 'ID',
        value: '12345',
      },
      {
        name: 'Room Name',
        value: '',
      },
      {
        name: 'Created at',
        value: 'Thursday',
      },
      {
        name: 'Active Users',
        value: 1,
      },
    ];
    const userSocket = mockedSocket as ExtendedSocket;
    (userSocket.rooms as Set<string>) = new Set(['12345']);
    (userSocket.on as jest.Mock).mockImplementation((event, cb) => cb());
    mockedRoomService.UpdateRoomUsers.mockResolvedValueOnce(roomDetailsStub);

    socketLifecycle({ socket: userSocket });
    await flushPromises();
    expect(userSocket.on).toHaveBeenCalledWith('disconnecting', expect.anything());
    expect(mockedRoomService.UpdateRoomUsers).toHaveBeenCalledTimes(1);
    expect(mockedIO.to).toHaveBeenCalledWith('12345');
    expect(mockedIO.emit).toHaveBeenCalledWith(
      'updatedRoomInfo',
      {
        roomDetails: roomDetailsStub,
      },
    );
    expect(mockedIO.emit).toHaveBeenCalledWith(
      'userLeft',
      expect.objectContaining({
        user: {
          id: '123',
          nickname: '',
        },
      }),
    );
  });

  it('does not send any events if room no longer has anyone in it', async () => {
    const userSocket = mockedSocket as ExtendedSocket;
    (userSocket.rooms as Set<string>) = new Set(['548']);
    (userSocket.on as jest.Mock).mockImplementation((event, cb) => cb());
    mockedRoomService.UpdateRoomUsers.mockResolvedValueOnce(false);

    socketLifecycle({ socket: userSocket });
    await flushPromises();
    expect(userSocket.on).toHaveBeenCalledWith('disconnecting', expect.anything());
    expect(mockedRoomService.UpdateRoomUsers).toHaveBeenCalledTimes(1);
    expect(mockedIO.to).not.toHaveBeenCalledWith('548');
    expect(mockedIO.emit).not.toHaveBeenCalledWith(
      'updatedRoomInfo',
      expect.anything(),
    );
    expect(mockedIO.emit).not.toHaveBeenCalledWith(
      'userLeft',
      expect.anything(),
    );
  });
});
