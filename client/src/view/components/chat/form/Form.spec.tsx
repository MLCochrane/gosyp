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
  it('emits message on change', () => {
    // (mockedSocket.on as jest.Mock).mockImplementationOnce((event, cb) => cb(false));
    const wrapper = mount(<Form />);
  });
});

/**
 *  it('cancels changes when user presses esc', done => {
    const wrapper = mount(<EditableText defaultValue="Hello" />);
    const input = wrapper.find('input');

    input.simulate('focus');
    input.simulate('change', { target: { value: 'Changed' } });
    input.simulate('keyDown', {
      which: 27,
      target: {
        blur() {
          // Needed since <EditableText /> calls target.blur()
          input.simulate('blur');
        },
      },
    });
    expect(input.get(0).value).to.equal('Hello');

    done();
  });
 */
