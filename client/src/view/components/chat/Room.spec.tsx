import React from 'react';
import * as Redux from 'react-redux';
import { render } from '@testing-library/react';
import 'socket.io-client';
import Room from './Room';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const useSelectorSpy = jest.spyOn(Redux, 'useSelector');
const initialState = {
  isMobile: false,
  needsResize: 0,
  shouldResize: 0,
  hasResized: 0,
};
useSelectorSpy.mockReturnValue(initialState);

it('renders without crashing', () => {
  render(<Room />);
});
