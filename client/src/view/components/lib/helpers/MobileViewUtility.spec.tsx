import React from 'react';
import * as Redux from 'react-redux';
import { render } from '@testing-library/react';
import {
  setNeedsResize,
  setShouldResize,
  mobileDetect,
  setAppHeight,
} from 'store/actions/globalActions';
import * as WindowEvents from './windowEvents';
import MobileViewUtility from './MobileViewUtility';

let useSelectorSpy: jest.SpyInstance;
let useDispatchSpy: jest.SpyInstance;
let mockDispatch: jest.Mock;

describe('MobileViewUtility', () => {
  beforeEach(() => {
    useSelectorSpy = jest.spyOn(Redux, 'useSelector');
    const initialState = {
      global: {
        isMobile: false,
        needsResize: 0,
        shouldResize: 0,
        hasResized: 0,
      },
    };

    useSelectorSpy.mockReturnValue(initialState);

    mockDispatch = jest.fn();
    useDispatchSpy = jest.spyOn(Redux, 'useDispatch');
    useDispatchSpy.mockReturnValue(mockDispatch);
  });

  it('dispatches events if mobile detected and resizing', () => {
    const mobileCheckSpy = jest.spyOn(WindowEvents, 'MobileCheck');
    const resizeHandlerSpy = jest.spyOn(WindowEvents, 'ResizeHandler');
    useSelectorSpy.mockReturnValueOnce({
      isMobile: true,
      needsResize: 0,
      shouldResize: 0,
      hasResized: 0,
    });

    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 500 });
    mobileCheckSpy.mockReturnValue([true]);
    resizeHandlerSpy.mockReturnValue([true]);

    render(<MobileViewUtility />);
    expect(mockDispatch).toHaveBeenCalledTimes(4);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, mobileDetect(true));
    expect(mockDispatch).toHaveBeenNthCalledWith(2, setNeedsResize());
    expect(mockDispatch).toHaveBeenNthCalledWith(3, setAppHeight(500));
    expect(mockDispatch).toHaveBeenNthCalledWith(4, setShouldResize());
  });

  it('dispatches events if desktop detected', () => {
    const mobileCheckSpy = jest.spyOn(WindowEvents, 'MobileCheck');
    const resizeHandlerSpy = jest.spyOn(WindowEvents, 'ResizeHandler');
    useSelectorSpy.mockReturnValueOnce({
      isMobile: false,
      needsResize: 0,
      shouldResize: 0,
      hasResized: 0,
    });

    mobileCheckSpy.mockReturnValue([false]);
    resizeHandlerSpy.mockReturnValue([false]);

    render(<MobileViewUtility />);
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenNthCalledWith(1, mobileDetect(false));
  });
});
