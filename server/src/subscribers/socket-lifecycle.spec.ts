import { Container } from 'typedi';
import IOServer, { Server } from 'socket.io';
import winston, { Logger } from 'winston';
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
});
