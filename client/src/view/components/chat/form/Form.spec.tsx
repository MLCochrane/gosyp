import React from 'react';
import { mount } from 'enzyme';
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
        '5593': '5593',
      },
      currentRoom: '5593',
    };

    useSelectorSpy.mockReturnValue(initialState);
  });

  it('emits typing event on change and blur', () => {
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
