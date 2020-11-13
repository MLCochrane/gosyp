import React from 'react';
import { shallow, mount } from 'enzyme';
import io, { Socket } from 'socket.io-client';
import RoomDetails from './RoomDetails';
import DetailRow from './DetailRow';
import ShareLink from './ShareLink';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const mockedIO = io as jest.Mocked<typeof io>;
const mockedSocket = mockedIO() as jest.Mocked<typeof Socket>;

describe('Room specific detail widget', () => {
  it('renders default rows before getting details', () => {
    const wrapper = shallow(<RoomDetails />);
    expect(wrapper.find(DetailRow)).toHaveLength(0);
    expect(wrapper.find(ShareLink)).toHaveLength(1);
  });

  it('updates rows when receiving new details', () => {
    (mockedSocket.on as jest.Mock).mockImplementation((event, cb) => {
      if (event === 'updatedRoomInfo') {
        return cb({
        roomDetails: [
          {
            name: 'ID',
            value: '#123-024',
          },
          {
            name: 'Room Name:',
            value: 'PopPop',
          },
          {
            name: 'Created at:',
            value: '12/24/20',
          },
        ]
      });
      }
    });

    const wrapper = mount(<RoomDetails />);
    expect(wrapper.find(DetailRow)).toHaveLength(3);
  });
});
