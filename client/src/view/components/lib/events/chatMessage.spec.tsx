import React from 'react';
import io, { Socket } from 'socket.io-client';
import { render, screen } from '@testing-library/react';
import chatMessage from './chatMessage';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const mockedIO = io as jest.Mocked<typeof io>;
const mockedSocket = mockedIO() as jest.Mocked<typeof Socket>;

const messageObject = ({
  id,
  msg,
  user,
  timestamp = new Date(''),
  messageType = 'message',
}: ChatMessage) => ({
  id,
  msg,
  user,
  timestamp,
  messageType,
});

it('returns message object when socket event received', () => {
  (mockedSocket.on as jest.Mock)
    .mockImplementationOnce((event, cb) => cb(messageObject({
      messageType: 'message',
      id: '5991',
      msg: 'Howdy Partner!',
      user: {
        id: '123',
        nickname: 'goober',
      },
      timestamp: new Date('Wednesday 12, 2014'),
    })))
    .mockImplementationOnce((event, cb) => cb(messageObject({
      messageType: 'message',
      id: '1971',
      msg: 'Arrrrrr!',
      user: {
        id: '123',
        nickname: 'goober',
      },
      timestamp: new Date('Wednesday 12, 2014'),
    })));

  const DummyComp = () => {
    const [message] = chatMessage();
    return (
      <>
        <h1 data-testid="messageid">{ message.id }</h1>
        <h2 data-testid="message">{ message.msg }</h2>
      </>
    );
  };

  const { unmount } = render(<DummyComp />);
  expect(screen.getByTestId('messageid').textContent).toBe('5991');
  expect(screen.getByTestId('message').textContent).toBe('Howdy Partner!');

  unmount();

  render(<DummyComp />);
  expect(screen.getByTestId('messageid').textContent).toBe('1971');
  expect(screen.getByTestId('message').textContent).toBe('Arrrrrr!');
});
