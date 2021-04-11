import React from 'react';
import * as Redux from 'react-redux';
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

let useSelectorSpy: jest.SpyInstance;

describe('Chat wrapper', () => {
  beforeEach(() => {
    useSelectorSpy = jest.spyOn(Redux, 'useSelector');
    const initialState = {
      isMobile: false,
      needsResize: 0,
      shouldResize: 0,
      hasResized: 0,
    };
    useSelectorSpy.mockReturnValue(initialState);
  });

  it('diplays children', () => {
    const wrapper = shallow(<Chat />);
    expect(wrapper.find(Feed)).toHaveLength(1);
    expect(wrapper.find(Form)).toHaveLength(1);
    expect(wrapper.find(TypingAlert)).toHaveLength(1);
  });
});
