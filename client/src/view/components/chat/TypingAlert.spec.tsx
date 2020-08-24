import React from 'react';
import { mount } from 'enzyme';
import io, { Socket } from 'socket.io-client';
import TypingAlert from './TypingAlert';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const mockedIO = io as jest.Mocked<typeof io>;
const mockedSocket = mockedIO() as jest.Mocked<typeof Socket>;

describe('Typing status alert', () => {
  it('diplays no message when socket returns false', () => {
    (mockedSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb(false));
    const wrapper = mount(<TypingAlert />);
    expect(wrapper.contains('Someone is typing...')).not.toEqual(true);
  });

  it('displays message if socket returns true', () => {
    (mockedSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb(true));
    const wrapper = mount(<TypingAlert />);
    expect(wrapper.contains('Someone is typing...')).toEqual(true);
  });
});
