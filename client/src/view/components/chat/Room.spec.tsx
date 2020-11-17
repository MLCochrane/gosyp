import React from 'react';
import { shallow } from 'enzyme';
import 'socket.io-client';
import Room from './Room';
import Chat from './Chat';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

describe('Room component', () => {
  it('displays children', () => {
    const wrapper = shallow(<Room />);
    expect(wrapper.find(Chat)).toHaveLength(1);
  });
});
