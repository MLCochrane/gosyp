import React from 'react';
import * as Redux from 'react-redux';
import { render } from '@testing-library/react';
import Chat from './Chat';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const useSelectorSpy = jest.spyOn(Redux, 'useSelector');

describe('Chat wrapper', () => {
  beforeAll(() => {
    useSelectorSpy.mockReturnValue({
      isMobile: false,
      needsResize: 0,
      shouldResize: 0,
      hasResized: 0,
      appHeight: 1080,
    });
  });

  it('diplays children', () => {
    const { rerender } = render(<Chat />);

    useSelectorSpy.mockReturnValueOnce({
      isMobile: true,
      needsResize: 1,
      shouldResize: 0,
      hasResized: 0,
      appHeight: 450,
    });
    rerender(<Chat />);
  });
});
