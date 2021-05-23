import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import io, { Socket } from 'socket.io-client';
import ShareLink from './ShareLink';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const mockedIO = io as jest.Mocked<typeof io>;
const mockedSocket = mockedIO() as jest.Mocked<typeof Socket>;

describe('Share link', () => {
  it('creates url with room id', () => {
    (mockedSocket.on as jest.Mock).mockImplementation((event, cb) => cb({
      status: 'success',
      data: {
        roomDetails: [
          {
            name: 'ID',
            value: '123-024',
          },
          {
            name: 'Room Name:',
            value: 'PopPop',
          },
          {
            name: 'Created at:',
            value: '12/24/20',
          },
        ],
      },
    }));

    render(<ShareLink />);
    expect(screen.getByDisplayValue('localhost:4242?roomId=123-024')).toBeDefined();
  });

  it('shows snackbar on copy and closes', async () => {
    Object.defineProperty(global.document, 'execCommand', { value: jest.fn() });
    render(<ShareLink />);
    userEvent.click(screen.getByRole('button', { name: /copy invite link to clipboard/i }));

    const snackbar = await screen.findByText('Copied to clipboard');
    expect(snackbar).toBeDefined();

    userEvent.click(screen.getByRole('button', { name: /close alert/i }));
    await waitFor(() => {
      expect(screen.queryByText('Copied to clipboard')).toBeFalsy();
    });
  });
});
