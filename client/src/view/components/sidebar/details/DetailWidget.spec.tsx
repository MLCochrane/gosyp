import React from 'react';
import { mount } from 'enzyme';
import io, { Socket } from 'socket.io-client';
import DetailWidget from './DetailWidget';
import SwitchView from '../../lib/helpers/SwitchView';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const mockedIO = io as jest.Mocked<typeof io>;
const mockedSocket = mockedIO() as jest.Mocked<typeof Socket>;

describe('Detail widget wrapper', () => {
  it.only('sets switch trigger to false when not in room', () => {
    (mockedSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb(false));
    const wrapper = mount(<DetailWidget />);
    expect(wrapper.find(SwitchView)).toHaveLength(1);
    expect(wrapper.find(SwitchView).props().trigger).toEqual(false);
  });

  it.only('sets switch trigger to true when in room', () => {
    (mockedSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb(true));
    const wrapper = mount(<DetailWidget />);
    expect(wrapper.find(SwitchView)).toHaveLength(1);
    expect(wrapper.find(SwitchView).props().trigger).toEqual(true);
  });
});
