import React from 'react';
import { mount } from 'enzyme';
import io, { Socket } from 'socket.io-client';
import Form from './Form';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const mockedIO = io as jest.Mocked<typeof io>;
const mockedSocket = mockedIO() as jest.Mocked<typeof Socket>;

describe('Chat input form', () => {
  beforeEach(() => {
    (mockedSocket.emit as jest.Mock).mockReset();
  });

  it('emits typing event on change and blur', () => {
    (mockedSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb(false, '5593'));
    const mockedEmit = (mockedSocket.emit as jest.Mock).mockImplementationOnce(
      (event, message) => message,
    );
    const wrapper = mount(<Form />);
    const input = wrapper.find('input');
    input.simulate('focus');
    input.simulate('change', { target: { value: 'My message' } });
    expect(mockedEmit).toHaveBeenCalledTimes(1);
    expect(mockedEmit).toHaveBeenCalledWith('userTyping', '5593', true);
    input.simulate('blur');
    expect(mockedEmit).toHaveBeenCalledTimes(2);
    expect(mockedEmit).toHaveBeenCalledWith('userTyping', '5593', false);
  });

  it('emits message event on submit', () => {
    (mockedSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb(false, '5593'));
    const mockedEmit = (mockedSocket.emit as jest.Mock).mockImplementationOnce(
      (event, message) => message,
    );
    const wrapper = mount(<Form />);
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'My message' } });
    input.simulate('submit', {
      preventDefault: () => {},
      target: { value: 'My message' },
    });
    expect(mockedEmit).toHaveBeenCalledTimes(3);
    expect(mockedEmit).toHaveBeenCalledWith('userTyping', '5593', true);
    expect(mockedEmit).toHaveBeenCalledWith('userTyping', '5593', false);
    expect(mockedEmit).toHaveBeenCalledWith('chatMessage', '5593', 'My message');
  });
});
