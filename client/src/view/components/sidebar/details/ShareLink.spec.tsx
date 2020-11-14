import React from 'react';
import { shallow, mount } from 'enzyme';
import io, { Socket } from 'socket.io-client';
import { Snackbar } from '@material-ui/core';
import ShareLink from './ShareLink';
import Alert from 'view/components/lib/helpers/Alert';

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
    (mockedSocket.on as jest.Mock).mockImplementation((event, cb) => {
      if (event === 'updatedRoomInfo') {
        return cb({
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
        ]
      });
      }
    });

    const wrapper = mount(<ShareLink />);
    expect(wrapper.find('input').props().value).toEqual('localhost:4242?roomId=123-024');
  });

  it('shows snackbar on copy', () => {
    const wrapper = shallow(<ShareLink />);
    expect(wrapper.find(Snackbar)).toHaveLength(1);
    expect(wrapper.find(Alert)).toHaveLength(1);
  })
});
