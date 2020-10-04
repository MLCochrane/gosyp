import { Container } from 'typedi';
import IOServer, { Server } from 'socket.io';
import winston, { Logger } from 'winston';
import socketClientMessages, {
  chatMessage,
  userTyping,
} from './socket-client-messages';
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

const mockedLogger = winston.createLogger() as jest.Mocked<Logger>;

let mockedSocket: ExtendedSocket;
const mockedIO = new IOServer() as jest.Mocked<Server>;

describe('Chat messages', () => {
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
        case 'userTyping':
          return cb(true);
        case 'chatMessage':
          return cb('Message');
        default:
          return cb(null);
      }
    });
    socketClientMessages({ socket: userSocket });

    expect(userSocket.on).toBeCalledTimes(2);
    expect((userSocket.on as any).mock.calls).toEqual(
      [
        ['chatMessage', expect.anything()],
        ['userTyping', expect.anything()],
      ],
    );
  });

  it('takes message from client and emits to the room', () => {
    const userSocket = mockedSocket as ExtendedSocket;
    (userSocket.on as jest.Mock)
      .mockImplementationOnce((event, cb) => cb('My message'))
      .mockImplementationOnce((event, cb) => cb('My Second Message!'));
    chatMessage(userSocket, mockedLogger, mockedIO);

    expect(userSocket.on).toHaveBeenCalledWith('chatMessage', expect.anything());
    expect(mockedIO.to).toHaveBeenCalledWith('12345');
    expect(mockedIO.emit).toHaveBeenCalledWith(
      'chatMessage',
      expect.objectContaining({
        msg: 'My message',
      }),
    );

    chatMessage(userSocket, mockedLogger, mockedIO);
    expect(userSocket.on).toHaveBeenCalledWith('chatMessage', expect.anything());
    expect(mockedIO.to).toHaveBeenCalledWith('12345');
    expect(mockedIO.emit).toHaveBeenCalledWith(
      'chatMessage',
      expect.objectContaining({
        msg: 'My Second Message!',
      }),
    );
  });

  it('sends typing boolean to room if socket typing', () => {
    const userSocket = mockedSocket as ExtendedSocket;
    // Makes me a bit iffy, but that's essentailly what is happening
    (userSocket.broadcast as any) = mockedIO;
    (userSocket.on as jest.Mock)
      .mockImplementationOnce((event, cb) => cb(true))
      .mockImplementationOnce((event, cb) => cb(false));

    userTyping(userSocket, mockedLogger);
    expect(userSocket.on).toHaveBeenCalledWith('userTyping', expect.anything());
    expect(userSocket.broadcast.to).toHaveBeenCalledWith('12345');
    expect(userSocket.broadcast.emit).toHaveBeenCalledWith(
      'userTyping',
      true,
    );

    userTyping(userSocket, mockedLogger);
    expect(userSocket.on).toHaveBeenCalledWith('userTyping', expect.anything());
    expect(userSocket.broadcast.to).toHaveBeenCalledWith('12345');
    expect(userSocket.broadcast.emit).toHaveBeenCalledWith(
      'userTyping',
      false,
    );
  });
});
