import React from 'react';
import { shallow } from 'enzyme';
import Chat from './Chat';
import Feed from './Feed';
import Form from './form/Form';
import TypingAlert from './TypingAlert';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

describe('Chat wrapper', () => {
  it('diplays children', () => {
    const wrapper = shallow(<Chat />);
    expect(wrapper.find(Feed)).toHaveLength(1);
    expect(wrapper.find(Form)).toHaveLength(1);
    expect(wrapper.find(TypingAlert)).toHaveLength(1);
  });
});
