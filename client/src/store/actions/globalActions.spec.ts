import {
  setNeedsResize,
  setShouldResize,
  mobileDetect,
  setHasResized,
  setAppHeight,
} from './globalActions';
import {
  SET_IS_MOBILE,
  SET_NEEDS_RESIZE,
  SET_SHOULD_RESIZE,
  SET_HAS_RESIZED,
  SET_APP_HEIGHT,
} from '../constants';

describe('Global Actions', () => {
  it('should create an action for SET_NEEDS_RESIZE', () => {
    const expectedAction = {
      type: SET_NEEDS_RESIZE,
    };
    expect(setNeedsResize()).toEqual(expectedAction);
  });

  it('should create an action for SET_APP_HEIGHT', () => {
    const expectedAction = {
      type: SET_APP_HEIGHT,
      height: 100,
    };
    expect(setAppHeight(100)).toEqual(expectedAction);
  });

  it('should create an action for SET_SHOULD_RESIZE', () => {
    const expectedAction = {
      type: SET_SHOULD_RESIZE,
    };
    expect(setShouldResize()).toEqual(expectedAction);
  });

  it('should create an action for SET_HAS_RESIZED', () => {
    const expectedAction = {
      type: SET_HAS_RESIZED,
    };
    expect(setHasResized()).toEqual(expectedAction);
  });

  it('should create an action to set our moible boolean', () => {
    const isMobile = true;
    const expectedAction = {
      type: SET_IS_MOBILE,
      isMobile,
    };
    expect(mobileDetect(true)).toEqual(expectedAction);
  });
});
