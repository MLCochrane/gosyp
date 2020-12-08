import {
  setNeedsResize,
  mobileDetect,
} from './globalActions';
import {
  SET_NEEDS_RESIZE,
  SET_IS_MOBILE,
} from '../constants';

describe('Global Actions', () => {
  it('should create an action to set our resize boolean', () => {
    const resize = true;
    const expectedAction = {
      type: SET_NEEDS_RESIZE,
      resize,
    };
    expect(setNeedsResize(true)).toEqual(expectedAction);
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
