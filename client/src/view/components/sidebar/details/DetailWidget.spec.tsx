import React from 'react';
import * as Redux from 'react-redux';
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

  it('sets switch trigger to false when not in room', () => {
    (mockedSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb(false));
    const wrapper = mount(<DetailWidget />);
    expect(wrapper.find(SwitchView)).toHaveLength(1);
    expect(wrapper.find(SwitchView).props().trigger).toEqual(false);
  });

  it('sets switch trigger to true when in room', () => {
    (mockedSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb(true));
    const wrapper = mount(<DetailWidget />);
    expect(wrapper.find(SwitchView)).toHaveLength(1);
    expect(wrapper.find(SwitchView).props().trigger).toEqual(true);
  });
});
