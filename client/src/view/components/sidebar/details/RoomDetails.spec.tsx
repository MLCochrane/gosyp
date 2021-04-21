import React from 'react';
import * as Redux from 'react-redux';
import { render, screen } from '@testing-library/react';
import io, { Socket } from 'socket.io-client';
import RoomDetails from './RoomDetails';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const mockedIO = io as jest.Mocked<typeof io>;
const mockedSocket = mockedIO() as jest.Mocked<typeof Socket>;

describe('Room specific detail widget', () => {
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

  it('updates rows when receiving new details', () => {
    (mockedSocket.on as jest.Mock).mockImplementation((event, cb) => cb({
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
    }));

    render(<RoomDetails />);
    expect(screen.getByText('ID:')).toBeDefined();
    expect(screen.getByText('Room Name:')).toBeDefined();
    expect(screen.getByText('Created at:')).toBeDefined();

    expect(screen.getByText('#123-024')).toBeDefined();
    expect(screen.getByText('PopPop')).toBeDefined();
    expect(screen.getByText('12/24/20')).toBeDefined();
  });

  it('renders our two buttons,', () => {
    render(<RoomDetails />);
    expect(screen.getByRole('button', { name: /leave current chat room/i })).toBeDefined();
    expect(screen.getByRole('button', { name: /copy invite link to clipboard/i })).toBeDefined();
  });
});
