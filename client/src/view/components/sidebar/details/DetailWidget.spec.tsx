import React from 'react';
import * as Redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import io, { Socket } from 'socket.io-client';
import DetailWidget from './DetailWidget';

jest.mock('react-transition-group', () => {
  const Transition = jest.fn(({ children }) => (children || null));
  const TransitionGroup = jest.fn(({ children }) => (children || null));
  return { Transition, TransitionGroup };
});

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const mockedIO = io as jest.Mocked<typeof io>;
const mockedSocket = mockedIO() as jest.Mocked<typeof Socket>;

describe('Detail widget wrapper', () => {
  beforeEach(() => {
    (mockedSocket.emit as jest.Mock).mockReset();
    const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(jest.fn());

    const useSelectorSpy = jest.spyOn(Redux, 'useSelector');

    const initialState = {
      rooms: {
        5593: '5593',
      },
      currentRoom: '5593',
    };

    useSelectorSpy.mockReturnValue(initialState);
  });

  it('displays info block when not in room', () => {
    (mockedSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb(
      {
        status: 'failure',
        data: {
          message: 'Not in room',
        },
      },
    ));
    render(<DetailWidget />);
    expect(screen.getByTestId('info-block')).toBeDefined();
    expect(screen.queryByTestId('room-details')).toBeFalsy();
  });

  it('displays room details when in room', () => {
    (mockedSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb(
      {
        status: 'success',
        data: {
          roomID: '1234',
        },
      },
    ));
    render(<DetailWidget />);

    expect(screen.queryByTestId('info-block')).toBeFalsy();
    expect(screen.getByTestId('room-details')).toBeDefined();
  });
});
