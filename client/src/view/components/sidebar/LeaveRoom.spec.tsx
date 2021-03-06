import React from 'react';
import * as Redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import io, { Socket } from 'socket.io-client';
import { leaveRoom } from 'store/actions/roomActions';
import LeaveRoom from './LeaveRoom';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

let useSelectorSpy: jest.SpyInstance;
let useDispatchSpy: jest.SpyInstance;
const mockedIO = io as jest.Mocked<typeof io>;
const mockedSocket = mockedIO() as jest.Mocked<typeof Socket>;

describe('Leave room button', () => {
  beforeEach(() => {
    (mockedSocket.emit as jest.Mock).mockReset();

    useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(jest.fn());

    useSelectorSpy = jest.spyOn(Redux, 'useSelector');
    const initialState = {
      rooms: {
        5593: '5593',
      },
      currentRoom: '5593',
    };

    useSelectorSpy.mockReturnValue(initialState);
  });

  it('renders icon button', () => {
    render(<LeaveRoom />);

    expect(screen.getByRole('button', { name: /leave current chat room/i })).toBeDefined();
  });

  it('emits socket event for leaving room', () => {
    render(<LeaveRoom />);
    const mockedEmit = (mockedSocket.emit as jest.Mock).mockImplementationOnce(
      (event, message) => message,
    );
    userEvent.click(screen.getByRole('button'));
    expect(mockedEmit).toHaveBeenCalledTimes(1);
    expect(mockedEmit).toHaveBeenCalledWith('removeMeFromRoom', '5593');
  });

  it('sends dispatch event to clear rooms from state', () => {
    const ourSpy = jest.fn();
    useDispatchSpy.mockReturnValue(ourSpy);
    render(<LeaveRoom />);

    userEvent.click(screen.getByRole('button'));
    expect(ourSpy).toHaveBeenCalledTimes(1);
    expect(ourSpy).toHaveBeenCalledWith(leaveRoom('5593'));
  });
});
