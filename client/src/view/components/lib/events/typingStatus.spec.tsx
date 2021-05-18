import React from 'react';
import io, { Socket } from 'socket.io-client';
import { render, screen } from '@testing-library/react';
import typingStatus from './typingStatus';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const mockedIO = io as jest.Mocked<typeof io>;
const mockedSocket = mockedIO() as jest.Mocked<typeof Socket>;

it('returns the bool from our hook', () => {
  (mockedSocket.on as jest.Mock)
    .mockImplementationOnce((event, cb) => cb({
      status: 'success',
      data: {
        isTyping: true,
      },
    }))
    .mockImplementationOnce((event, cb) => cb({
      status: 'success',
      data: {
        isTyping: false,
      },
    }));

  const DummyComp = () => {
    const [typing] = typingStatus();
    return (typing ? <h1>typing</h1> : <h1>not typing</h1>);
  };

  const { unmount } = render(<DummyComp />);
  expect(screen.getByText('typing')).toBeDefined();
  expect(screen.queryByText('not typing')).toBeFalsy();

  /**
   * Removes our first rendered component so we aren't getting the first
   * component on second assertions.
   */
  unmount();

  render(<DummyComp />);
  expect(screen.getByText('not typing')).toBeDefined();
  expect(screen.queryByText('typing')).toBeFalsy();
});
