import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import io, { Socket } from 'socket.io-client';
import Form from './Form';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

let useSelectorSpy;
const mockedIO = io as jest.Mocked<typeof io>;
const mockedSocket = mockedIO() as jest.Mocked<typeof Socket>;

describe('Chat input form', () => {
  beforeEach(() => {
    (mockedSocket.emit as jest.Mock).mockReset();

    useSelectorSpy = jest.spyOn(Redux, 'useSelector');

    const initialState = {
      rooms: {
        5593: '5593',
      },
      currentRoom: '5593',
    };

    useSelectorSpy.mockReturnValue(initialState);
  });

  it('emits typing event on change and blur', async () => {
    const mockedEmit = (mockedSocket.emit as jest.Mock).mockImplementationOnce(
      (event, message) => message,
    );
    render(<Form />);
    const inputElement = screen.getByRole('textbox');

    // Typing in field
    userEvent.type(inputElement, 'Hey there');

    expect(mockedEmit).toHaveBeenCalledTimes(9);
    expect(mockedEmit).toHaveBeenCalledWith('userTyping', '5593', true);
    inputElement.dispatchEvent(new Event('blur'));

    expect(mockedEmit).toHaveBeenCalledTimes(10);
    expect(mockedEmit).toHaveBeenCalledWith('userTyping', '5593', false);
  });

  it('emits message event on submit', () => {
    const mockedEmit = (mockedSocket.emit as jest.Mock).mockImplementationOnce(
      (event, message) => message,
    );
    const { rerender } = render(<Form />);
    const inputElement = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: 'Send' });

    // Sends message
    userEvent.type(inputElement, 'Hi');
    userEvent.click(button);
    expect(mockedEmit).toHaveBeenCalledTimes(5);
    expect(mockedEmit).toHaveBeenCalledWith('userTyping', '5593', true);
    expect(mockedEmit).toHaveBeenCalledWith('userTyping', '5593', false);
    expect(mockedEmit).toHaveBeenCalledWith('chatMessage', '5593', 'Hi');

    // Test if disabled attr removed from button
    rerender(<Form />);
    const form = screen.getByRole('form');
    form.dispatchEvent(new Event('submit'));

    // Not called with empty form
    expect(mockedEmit).toHaveBeenCalledTimes(5);
  });
});
