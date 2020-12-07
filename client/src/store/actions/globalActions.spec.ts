import { setNeedsResize } from './globalActions';
import { SET_NEEDS_RESIZE } from '../constants';

describe('Room Actions', () => {
  it('should create an action to set our resize boolean', () => {
    const resize = true;
    const expectedAction = {
      type: SET_NEEDS_RESIZE,
      resize,
    };
    expect(setNeedsResize(true)).toEqual(expectedAction);
  });
});
