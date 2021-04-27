import React from 'react';
import * as Redux from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { render, screen } from '@testing-library/react';
import Feed from './Feed';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const mockedIO = io as jest.Mocked<typeof io>;
const mockedSocket = mockedIO() as jest.Mocked<typeof Socket>;
let useSelectorSpy: jest.SpyInstance;

describe('Feed', () => {
  beforeEach(() => {
    useSelectorSpy = jest.spyOn(Redux, 'useSelector');
    const initialState = {
      isMobile: false,
      needsResize: 0,
      shouldResize: 0,
      hasResided: 0,
    };
    useSelectorSpy.mockReturnValue(initialState);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does not display anything if no messages', () => {
    (mockedSocket.on as jest.Mock).mockImplementationOnce((event, cb) => {
      switch (event) {
        case 'userLeft':
          return cb(
            {
              status: 'success',
              data: {
                userAction: {
                  user: {
                    id: null,
                    nickname: null,
                  },
                  timestamp: new Date('June 20, 2021'),
                },
              },
            },
          );
        case 'userJoined':
          return cb(
            {
              status: 'success',
              data: {
                userAction: {
                  user: {
                    id: null,
                    nickname: null,
                  },
                  timestamp: new Date('June 20, 2021'),
                },
              },
            },
          );
        case 'chatMessage':
          return cb({
            status: 'success',
            data: {
              msg: {
                msg: '',
                id: null,
                user: {
                  id: null,
                  nickname: null,
                },
                timestamp: new Date('June 20, 2021'),
              },
            },
          });
        default:
          return cb(null);
      }
    });

    render(<Feed />);
    expect(screen.getByRole('heading').textContent).toBe('No one\'s talking... awkward');
  });

  it('displays user message when socket recieves chat message', () => {
    (mockedSocket.on as jest.Mock).mockImplementationOnce((event, cb) => {
      switch (event) {
        case 'chatMessage':
          return cb({
            status: 'success',
            data: {
              msg: {
                msg: 'Hi hi',
                id: '152651',
                user: {
                  id: '12345',
                  nickname: null,
                },
                timestamp: new Date('June 20, 2021'),
              },
            },
          });
        default:
          return cb({
            user: {
              id: null,
              nickname: null,
            },
            timestamp: new Date('June 20, 2021'),
          });
      }
    });
    render(<Feed />);
    expect(screen.getByText('Hi hi')).toBeDefined();
  });

  it('displays both message types', () => {
    (mockedSocket.on as jest.Mock).mockImplementation((event, cb) => {
      switch (event) {
        case 'userLeft':
          return cb(
            {
              status: 'success',
              data: {
                userAction: {
                  user: {
                    id: '12345',
                    nickname: null,
                  },
                  timestamp: new Date('June 20, 2021'),
                },
              },
            },
          );
        case 'userJoined':
          return cb(
            {
              status: 'success',
              data: {
                userAction: {
                  user: {
                    id: '51515',
                    nickname: null,
                  },
                  timestamp: new Date('June 20, 2021'),
                },
              },
            },
          );
        case 'chatMessage':
          return cb({
            status: 'success',
            data: {
              msg: {
                msg: 'How is everyone tonight??',
                id: '152f1',
                user: {
                  id: '12345',
                  nickname: null,
                },
                timestamp: new Date('June 20, 2021'),
              },
            },
          });
        default:
          return cb(null);
      }
    });
    render(<Feed />);
    expect(screen.getByText('12345 has left the chat.')).toBeDefined();
    expect(screen.getByText('51515 has joined the chat.')).toBeDefined();
    expect(screen.getByText('How is everyone tonight??')).toBeDefined();
  });
});
