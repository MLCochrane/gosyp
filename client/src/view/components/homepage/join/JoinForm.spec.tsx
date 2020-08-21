import React from 'react';
import { shallow } from 'enzyme';
import 'socket.io-client';
import JoinForm from './JoinForm';
import Form from '../../lib/forms/Form';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

describe('Join Form', () => {
  it('renders form', () => {
    const wrapper = shallow(<JoinForm />);
    expect(wrapper.find(Form)).toHaveLength(1);
  });
});
