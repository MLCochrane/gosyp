import React from 'react';
import { render, screen } from '@testing-library/react';
import io, { Socket } from 'socket.io-client';
import {
  HasAddedToRoom,
  NotAddedToRoom,
  CreateRoomSuccess,
  CreateRoomError,
  RoomDetailsUpdated,
} from './rooms';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const mockedIO = io as jest.Mocked<typeof io>;
const mockedSocket = mockedIO() as jest.Mocked<typeof Socket>;

it('returns room status and id when added to room', async () => {
  (mockedSocket.on as jest.Mock)
    .mockImplementationOnce((event, cb) => cb(false, null))
    .mockImplementationOnce((event, cb) => cb(true, '1234'));

  const Dummy = () => {
    const [addedToRoom, roomId] = HasAddedToRoom();
    return (
      <div>
        {
          addedToRoom ? <h1>{ roomId }</h1> : null
        }
      </div>
    );
  };

  const { unmount } = render(<Dummy />);
  expect(await screen.queryByRole('heading')).toBeFalsy();

  unmount();

  render(<Dummy />);
  expect(await screen.queryByRole('heading')).toBeTruthy();
  expect((await screen.findByRole('heading')).textContent).toBe('1234');
});

it('returns error message when refused room access', async () => {
  (mockedSocket.on as jest.Mock)
    .mockImplementationOnce((event, cb) => cb({ status: false, message: null }))
    .mockImplementationOnce((event, cb) => cb({ status: true, message: 'Not added to room' }));

  const Dummy = () => {
    const [notAdded, message] = NotAddedToRoom();
    return (
      <div>
        {
          notAdded ? <h1>{ message }</h1> : <h1>Added!</h1>
        }
      </div>
    );
  };

  const { unmount } = render(<Dummy />);
  expect((await screen.findByRole('heading')).textContent).toBe('Added!');

  unmount();

  render(<Dummy />);
  expect((await screen.findByRole('heading')).textContent).toBe('Not added to room');
});

it('returns room id and optional nickname on room creation success', async () => {
  (mockedSocket.on as jest.Mock)
    .mockImplementationOnce((event, cb) => cb({ message: { uuid: '1245-12', nickname: null } }))
    .mockImplementationOnce((event, cb) => cb({ message: { uuid: '5125', nickname: 'Porkchop' } }));

  const Dummy = () => {
    const [message] = CreateRoomSuccess();
    return (
      <div>
        <h1>{ message['room-id'] }</h1>
        {
          message.nickname ? (
            <h2>{ message.nickname }</h2>
          ) : null
        }
      </div>
    );
  };

  const { unmount } = render(<Dummy />);
  expect((await screen.findByRole('heading', { level: 1 })).textContent).toBe('1245-12');
  expect((await screen.queryByRole('heading', { level: 2 }))).toBeFalsy();

  unmount();

  render(<Dummy />);
  expect((await screen.findByRole('heading', { level: 1 })).textContent).toBe('5125');
  expect((await screen.findByRole('heading', { level: 2 })).textContent).toBe('Porkchop');
});

it('returns error if room not created', async () => {
  (mockedSocket.on as jest.Mock)
    .mockImplementationOnce((event, cb) => cb({ message: { message: 'Oops, no room for you!' } }))
    .mockImplementationOnce((event, cb) => cb({ message: { message: 'That room already exists.' } }));

  const Dummy = () => {
    const [message] = CreateRoomError();
    return (
      <div>
        <h1>{ message.message }</h1>
      </div>
    );
  };

  const { unmount } = render(<Dummy />);
  expect((await screen.findByRole('heading', { level: 1 })).textContent).toBe('Oops, no room for you!');

  unmount();

  render(<Dummy />);
  expect((await screen.findByRole('heading', { level: 1 })).textContent).toBe('That room already exists.');
});

it('returns updated room details', async () => {
  (mockedSocket.on as jest.Mock)
    .mockImplementationOnce((event, cb) => cb(
      {
        roomDetails: [
          {
            name: 'id',
            value: '1234',
          },
        ],
      },
    ))
    .mockImplementationOnce((event, cb) => cb(
      {
        roomDetails: [
          {
            name: 'id',
            value: '4321',
          },
          {
            name: 'room name',
            value: 'ChitChat',
          },
        ],
      },
    ));

  const Dummy = () => {
    const [details] = RoomDetailsUpdated();
    return (
      <div>
        {
          details.map((el, index) => (
            <div data-testid="detail-row" key={ index }>
              <h1>{ el.name }</h1>
              <h2>{ el.value }</h2>
            </div>
          ))
        }
      </div>
    );
  };

  const { unmount } = render(<Dummy />);
  const rowsOne = screen.getAllByTestId('detail-row');
  expect(rowsOne).toHaveLength(1);

  expect((await screen.findByRole('heading', { level: 1 })).textContent).toBe('id');
  expect((await screen.findByRole('heading', { level: 2 })).textContent).toBe('1234');

  unmount();

  render(<Dummy />);
  const rowsTwo = screen.getAllByTestId('detail-row');
  expect(rowsTwo).toHaveLength(2);
  expect((await screen.findAllByRole('heading', { level: 1 }))[0].textContent).toBe('id');
  expect((await screen.findAllByRole('heading', { level: 2 }))[0].textContent).toBe('4321');

  expect((await screen.findAllByRole('heading', { level: 1 }))[1].textContent).toBe('room name');
  expect((await screen.findAllByRole('heading', { level: 2 }))[1].textContent).toBe('ChitChat');
});
