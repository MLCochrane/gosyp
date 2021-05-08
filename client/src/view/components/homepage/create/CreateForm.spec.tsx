import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import io, { Socket } from 'socket.io-client';
import CreateForm from './CreateForm';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});
const mockedIO = io as jest.Mocked<typeof io>;
const mockedSocket = mockedIO() as jest.Mocked<typeof Socket>;

it('renders form', () => {
  render(<CreateForm />);
  expect(screen.getByRole('form')).toBeDefined();
  expect(screen.getByRole('textbox', { name: 'Room Name' })).toBeDefined();
  expect(screen.getByText('Optional name for your chat room')).toBeDefined();
  expect(screen.getByRole('textbox', { name: 'Your Nickname' })).toBeDefined();
  expect(screen.getByText('Optional display name')).toBeDefined();
  expect(screen.getByRole('button', { name: 'Create Room' })).toBeDefined();
});

it('emits event when submitted', async () => {
  const mockedEmit = (mockedSocket.emit as jest.Mock).mockImplementationOnce(
    (event, message) => message,
  );

  // Empty fields
  const { rerender } = render(<CreateForm />);
  const roomInput = screen.getByRole('textbox', { name: 'Room Name' });
  const nicknameInput = screen.getByRole('textbox', { name: 'Your Nickname' });
  const button = screen.getByRole('button', { name: 'Create Room' });
  userEvent.click(button);
  expect(mockedEmit).toHaveBeenCalledWith('createRoom', { name: '', nickname: '' });

  // Just room name
  rerender(<CreateForm />);
  await userEvent.type(roomInput, 'My Room', { delay: 1 });
  userEvent.click(button);
  expect(mockedEmit).toHaveBeenCalledWith('createRoom', { name: 'My Room', nickname: '' });

  // Both fields
  rerender(<CreateForm />);
  await userEvent.type(roomInput, 'Chill Zone', { delay: 1 });
  await userEvent.type(nicknameInput, 'Phil', { delay: 1 });
  userEvent.click(button);
  expect(mockedEmit).toHaveBeenCalledWith('createRoom', { name: 'Chill Zone', nickname: 'Phil' });
});

it('requests room access once room successfully created', () => {
  const mockedEmit = (mockedSocket.emit as jest.Mock).mockImplementationOnce(
    (event, message) => message,
  );
  (mockedSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb({
    status: 'success',
    data: {
      room: {
        uuid: '125f',
        nickname: 'Rebecca',
      },
    },
  }));
  render(<CreateForm />);
  expect(mockedEmit).toHaveBeenCalledWith('addMeToRoom', { 'room-id': '125f', nickname: 'Rebecca' });
});
