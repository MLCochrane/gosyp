import React from 'react';
import { render, screen } from '@testing-library/react';
import io, { Socket } from 'socket.io-client';
import TitleBar from './TitleBar';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const mockedIO = io as jest.Mocked<typeof io>;
const mockedSocket = mockedIO() as jest.Mocked<typeof Socket>;

it('displays site name if not in room', () => {
  render(<TitleBar />);
  expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('gosyp.io');
});

it('displays title based on room detail name', () => {
  (mockedSocket.on as jest.Mock)
    .mockImplementationOnce((event, cb) => cb({
      status: 'success',
      data: {
        roomDetails: [
          {
            name: 'ID',
            value: '#123-024',
          },
          {
            name: 'Room Name',
            value: 'PopPop',
          },
          {
            name: 'Created at',
            value: '12/24/20',
          },
        ],
      },
    }))
    .mockImplementationOnce((event, cb) => cb({
      status: 'success',
      data: {
        roomDetails: [
          {
            name: 'ID',
            value: '#123-024',
          },
          {
            name: 'Room Name',
            value: 'The Best Room',
          },
          {
            name: 'Created at',
            value: '12/24/20',
          },
        ],
      },
    }));

  // First room name
  const { unmount } = render(<TitleBar />);
  expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Room Name: PopPop');

  unmount();

  // Second room name
  render(<TitleBar />);
  expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Room Name: The Best Room');
});

it('displays the site title again after leaving a room', () => {
  (mockedSocket.on as jest.Mock).mockImplementationOnce((event, cb) => {
    switch (event) {
      case 'updatedRoomInfo':
        return cb(
          {
            status: 'success',
            data: {
              roomDetails: [
                {
                  name: 'ID',
                  value: '#123-024',
                },
                {
                  name: 'Room Name',
                  value: 'The Grand Hotel',
                },
                {
                  name: 'Created at',
                  value: '12/24/20',
                },
              ],
            },
          },
        );
      case 'addedToRoom':
        return cb(
          {
            status: 'failure',
            data: {
              message: 'Removed from room',
            },
          },
        );
      default:
        return cb(null);
    }
  });

  const { rerender } = render(<TitleBar />);
  expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Room Name: The Grand Hotel');

  // Second room name
  rerender(<TitleBar />);
  expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('gosyp.io');
});
