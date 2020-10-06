import React from 'react';
import io, { Socket } from 'socket.io-client';
import { mount } from 'enzyme';
import Feed from './Feed';
import UserMessage from './messages/UserMessage';
import StatusMessage from './messages/StatusMessage';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const mockedIO = io as jest.Mocked<typeof io>;
const mockedSocket = mockedIO() as jest.Mocked<typeof Socket>;

describe('Feed', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does not display anything if no messages', () => {
    (mockedSocket.on as jest.Mock).mockImplementationOnce((event, cb) => {
      switch (event) {
        case 'userLeft':
          return cb({
            user: {
              id: null,
              nickname: null,
            },
            timestamp: new Date(''),
          });
        case 'userJoined':
          return cb({
            user: {
              id: null,
              nickname: null,
            },
            timestamp: new Date(''),
          });
        case 'chatMessage':
          return cb({
            user: {
              id: null,
              nickname: null,
            },
            msg: '',
            timestamp: new Date(''),
          });
        default:
          return cb(null);
      }
    });
    const wrapper = mount(<Feed />);
    expect(wrapper.find(UserMessage)).toHaveLength(0);
    expect(wrapper.find(StatusMessage)).toHaveLength(0);
  });

  it('displays user message when socket recieves chat message', () => {
    (mockedSocket.on as jest.Mock).mockImplementationOnce((event, cb) => {
      switch (event) {
        case 'chatMessage':
          return cb({
            id: '152651',
            user: {
              id: '12345',
              nickname: null,
            },
            msg: 'Hi hi',
            timestamp: new Date(''),
          });
        default:
          return cb({
            user: {
              id: null,
              nickname: null,
            },
            timestamp: new Date(''),
          });
      }
    });
    const wrapper = mount(<Feed />);
    expect(wrapper.find(UserMessage)).toHaveLength(1);
    expect(wrapper.find(StatusMessage)).toHaveLength(0);
  });

  it('displays both message types', () => {
    (mockedSocket.on as jest.Mock).mockImplementation((event, cb) => {
      switch (event) {
        case 'userLeft':
          return cb({
            user: {
              id: '12345',
              nickname: null,
            },
            timestamp: new Date(''),
          });
        case 'userJoined':
          return cb({
            user: {
              id: '12345',
              nickname: null,
            },
            timestamp: new Date(''),
          });
        case 'chatMessage':
          return cb({
            id: '152f1',
            user: {
              id: '12345',
              nickname: null,
            },
            msg: 'Hi hi',
            timestamp: new Date(''),
          });
        default:
          return cb(null);
      }
    });
    const wrapper = mount(<Feed />);
    expect(wrapper.find(UserMessage)).toHaveLength(1);
    expect(wrapper.find(StatusMessage)).toHaveLength(2);
  });
});
