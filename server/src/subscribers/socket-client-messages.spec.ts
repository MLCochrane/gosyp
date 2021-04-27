import { Container } from 'typedi';
import { Server } from 'socket.io';
import winston, { Logger } from 'winston';
import { ExtendedSocket } from 'types/global.d';
import socketClientMessages, {
  chatMessage,
  userTyping,
} from './socket-client-messages';

jest.mock('socket.io');
jest.mock('winston');

const mockedLogger = winston.createLogger() as jest.Mocked<Logger>;

let mockedSocket: ExtendedSocket;
const mockedIO = new Server() as jest.Mocked<Server>;

describe('Chat messages', () => {
  beforeAll(() => {
    Container.set('io', mockedIO);
    Container.set('logger', mockedLogger);
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
    expect((userSocket.on as jest.Mock).mock.calls).toEqual(
      [
        ['chatMessage', expect.anything()],
        ['userTyping', expect.anything()],
      ],
    );
  });

  it('takes message from client and emits to the room', () => {
    const userSocket = mockedSocket as ExtendedSocket;
    (userSocket.on as jest.Mock)
      .mockImplementationOnce((event, cb) => cb('782', 'My message'))
      .mockImplementationOnce((event, cb) => cb('782', 'My Second Message!'));
    chatMessage(userSocket, mockedIO);

    expect(userSocket.on).toHaveBeenCalledWith('chatMessage', expect.anything());
    expect(mockedIO.to).toHaveBeenCalledWith('782');
    expect(mockedIO.emit).toHaveBeenCalledWith(
      'chatMessage',
      {
        status: 'success',
        data: {
          id: expect.anything(),
          timestamp: expect.anything(),
          msg: 'My message',
          user: {
            id: '123',
            nickname: '',
          },
        },
      },
    );

    chatMessage(userSocket, mockedIO);
    expect(userSocket.on).toHaveBeenCalledWith('chatMessage', expect.anything());
    expect(mockedIO.to).toHaveBeenCalledWith('782');
    expect(mockedIO.emit).toHaveBeenCalledWith(
      'chatMessage',
      {
        status: 'success',
        data: {
          id: expect.anything(),
          timestamp: expect.anything(),
          msg: 'My Second Message!',
          user: {
            id: '123',
            nickname: '',
          },
        },
      },
    );
  });

  it('sends typing boolean to room if socket typing', () => {
    const userSocket = mockedSocket as ExtendedSocket;
    /**
     * Feels a bit iffy but kind of what's happening. We're mostly
     * concerned with the function calling with the correct things
     * rather than the implementation being the same.
     */
    (userSocket.broadcast as unknown) = mockedIO;
    (userSocket.on as jest.Mock)
      .mockImplementationOnce((event, cb) => cb('89991', true))
      .mockImplementationOnce((event, cb) => cb('89991', false));

    userTyping(userSocket);
    expect(userSocket.on).toHaveBeenCalledWith('userTyping', expect.anything());
    expect(userSocket.broadcast.to).toHaveBeenCalledWith('89991');
    expect(userSocket.broadcast.emit).toHaveBeenCalledWith(
      'userTyping',
      {
        status: 'success',
        data: {
          isTyping: true,
        },
      },
    );

    userTyping(userSocket);
    expect(userSocket.on).toHaveBeenCalledWith('userTyping', expect.anything());
    expect(userSocket.broadcast.to).toHaveBeenCalledWith('89991');
    expect(userSocket.broadcast.emit).toHaveBeenCalledWith(
      'userTyping',
      {
        status: 'success',
        data: {
          isTyping: false,
        },
      },
    );
  });
});
