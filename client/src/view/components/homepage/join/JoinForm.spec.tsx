import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import io, { Socket } from 'socket.io-client';
import JoinForm from './JoinForm';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});
const mockedIO = io as jest.Mocked<typeof io>;
const mockedSocket = mockedIO() as jest.Mocked<typeof Socket>;

describe('Join Form', () => {
  it('renders form', () => {
    render(<JoinForm />);
    expect(screen.getByRole('form')).toBeDefined();
    expect(screen.getByRole('textbox', { name: 'Room ID' })).toBeDefined();
    expect(screen.getByText('Room ID that has been shared with you')).toBeDefined();
    expect(screen.getByRole('textbox', { name: 'Nickname' })).toBeDefined();
    expect(screen.getByText('Optional display name')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Join Room' })).toBeDefined();
  });

  it('prepopulates form with room from query', () => {
    Object.defineProperty(window, 'location', { writable: true, configurable: true, value: { search: '?roomId=gh185' } });
    render(<JoinForm />);
    expect((screen.getByRole('textbox', { name: 'Room ID' }) as HTMLInputElement).value).toBe('gh185');
  });

  it('emits event on submit', async () => {
    const mockedEmit = (mockedSocket.emit as jest.Mock).mockImplementationOnce(
      (event, message) => message,
    );
    render(<JoinForm />);
    userEvent.clear(screen.getByRole('textbox', { name: 'Room ID' }));
    // Have to add waitFor as our form sets state asynchronously and no delay option
    await waitFor(() => expect((screen.getByRole('textbox', { name: 'Room ID' }) as HTMLInputElement).value).toBe(''));
    await userEvent.type(screen.getByRole('textbox', { name: 'Room ID' }), 'bhja1hf', { delay: 1 });
    await userEvent.type(screen.getByRole('textbox', { name: 'Nickname' }), 'Frank', { delay: 1 });
    userEvent.click(screen.getByRole('button', { name: 'Join Room' }));
    expect(mockedEmit).toHaveBeenCalledWith('addMeToRoom', { 'room-id': 'bhja1hf', nickname: 'Frank' });
  });
});
