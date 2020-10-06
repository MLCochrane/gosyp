import { Container } from 'typedi';
import IOServer, { Server } from 'socket.io';
import winston, { Logger } from 'winston';
import flushPromises from 'flush-promises';
import RoomService from '../services/room-service';
import socketLifecycle from './socket-lifecycle';
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
    Container.set('roomName', '12345');
    Container.set(RoomService, mockedRoomService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('sends room update if others in room and socket leaves', async () => {
    const roomDetailsStub = [
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
        value: 1,
      },
    ];
    const userSocket = mockedSocket as ExtendedSocket;
    (userSocket.on as jest.Mock).mockImplementation((event, cb) => cb());
    mockedRoomService.UpdateRoomUsers.mockResolvedValueOnce(roomDetailsStub);

    socketLifecycle({ socket: userSocket });
    await flushPromises();
    expect(userSocket.on).toHaveBeenCalledWith('disconnect', expect.anything());
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

  it('sends room update if others in room and socket leaves', async () => {
    const roomDetailsStub = [
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
        value: 1,
      },
    ];
    const userSocket = mockedSocket as ExtendedSocket;
    (userSocket.on as jest.Mock).mockImplementation((event, cb) => cb());
    mockedRoomService.UpdateRoomUsers.mockResolvedValueOnce(roomDetailsStub);

    socketLifecycle({ socket: userSocket });
    await flushPromises();
    expect(userSocket.on).toHaveBeenCalledWith('disconnect', expect.anything());
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
    (userSocket.on as jest.Mock).mockImplementation((event, cb) => cb());
    mockedRoomService.UpdateRoomUsers.mockResolvedValueOnce(false);

    socketLifecycle({ socket: userSocket });
    await flushPromises();
    expect(userSocket.on).toHaveBeenCalledWith('disconnect', expect.anything());
    expect(mockedRoomService.UpdateRoomUsers).toHaveBeenCalledTimes(1);
    expect(mockedIO.to).not.toHaveBeenCalledWith('12345');
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
