import reducer from './globalReducer';
import {
  SET_IS_MOBILE,
  SET_NEEDS_RESIZE,
} from '../constants';

const defaultState = {
  needsResize: 0,
  isMobile: false,
};

describe('Global Reducer', () => {
  it('should handle SET_NEEDS_RESIZE', () => {
    expect(
      reducer(defaultState, {
        type: SET_NEEDS_RESIZE,
      })
    ).toEqual(
      {
        needsResize: 1,
        isMobile: false,
      }
    );

    expect(
      reducer({
        needsResize: 1,
        isMobile: false,
      }, {
        type: SET_NEEDS_RESIZE,
      })
    ).toEqual(
      {
        needsResize: 2,
        isMobile: false,
      }
    );
  });

  it('should handle SET_IS_MOBILE', () => {
    expect(
      reducer(defaultState, {
        type: SET_IS_MOBILE,
        isMobile: false,
      })
    ).toEqual(
      {
        needsResize: 0,
        isMobile: false,
      }
    );

    expect(
      reducer({
        needsResize: 1,
        isMobile: false,
      }, {
        type: SET_IS_MOBILE,
        isMobile: true,
      })
    ).toEqual(
      {
        needsResize: 1,
        isMobile: true,
      }
    );
  });
});
