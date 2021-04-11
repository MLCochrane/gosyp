import React from 'react';
import * as Redux from 'react-redux';
import { shallow, mount } from 'enzyme';
import io, { Socket } from 'socket.io-client';
import { IconButton } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import { leaveRoom } from 'store/actions/roomActions';
import LeaveRoom from './LeaveRoom';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

let useSelectorSpy: jest.SpyInstance;
let useDispatchSpy: jest.SpyInstance;
const mockedIO = io as jest.Mocked<typeof io>;
const mockedSocket = mockedIO() as jest.Mocked<typeof Socket>;

describe('Leave room button', () => {
  beforeEach(() => {
    (mockedSocket.emit as jest.Mock).mockReset();

    useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(jest.fn());

    useSelectorSpy = jest.spyOn(Redux, 'useSelector');
    const initialState = {
      rooms: {
        5593: '5593',
      },
      currentRoom: '5593',
    };

    useSelectorSpy.mockReturnValue(initialState);
  });

  it('renders icon button', () => {
    const wrapper = shallow(<LeaveRoom />);

    expect(wrapper.find(IconButton)).toHaveLength(1);
    expect(wrapper.find(ExitToApp)).toHaveLength(1);
  });

  it('emits socket event for leaving room', () => {
    const wrapper = mount(<LeaveRoom />);
    const mockedEmit = (mockedSocket.emit as jest.Mock).mockImplementationOnce(
      (event, message) => message,
    );
    wrapper.find(IconButton).simulate('click');
    expect(mockedEmit).toHaveBeenCalledTimes(1);
    expect(mockedEmit).toHaveBeenCalledWith('removeMeFromRoom', '5593');
  });

  it('sends dispatch event to clear rooms from state', () => {
    const ourSpy = jest.fn();
    useDispatchSpy.mockReturnValue(ourSpy);
    const wrapper = mount(<LeaveRoom />);

    wrapper.find(IconButton).simulate('click');
    expect(ourSpy).toHaveBeenCalledTimes(1);
    expect(ourSpy).toHaveBeenCalledWith(leaveRoom('5593'));
  });
});
