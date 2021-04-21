import React from 'react';
import * as Redux from 'react-redux';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('socket.io-client', () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

const useSelectorSpy = jest.spyOn(Redux, 'useSelector');
const useDispatchSpy = jest.spyOn(Redux, 'useDispatch');

describe('App component', () => {
  beforeAll(() => {
    useSelectorSpy.mockReturnValue({
      isMobile: false,
      needsResize: 0,
      shouldResize: 0,
      hasResized: 0,
      appHeight: 1080,
    });

    useDispatchSpy.mockReturnValue(jest.fn());
  });

  it('Renders without crashing', () => {
    /**
     * Would ideally like to test the store dispatches, however because this is
     * the entire app it's difficult to know how to stub the socket events or
     * dispatch functions as they'll be used for every child component as well.
     *
     * Perhaps a reason to move some of the logic into a shared component, but
     * that can be a discussion for another day.
     */
    const { rerender } = render(<App />);
    useSelectorSpy.mockReturnValue({
      isMobile: true,
      needsResize: 1,
      shouldResize: 1,
      hasResized: 0,
      appHeight: 600,
    });

    rerender(<App />);
  });
});
