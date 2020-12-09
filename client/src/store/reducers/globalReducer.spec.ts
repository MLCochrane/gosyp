import reducer from './globalReducer';
import {
  SET_IS_MOBILE,
  SET_NEEDS_RESIZE,
  SET_SHOULD_RESIZE,
  SET_HAS_RESIZED,
} from '../constants';

const defaultState = {
  needsResize: 0,
  shouldResize: 0,
  hasResized: 0,
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
        shouldResize: 0,
        hasResized: 0,
        isMobile: false,
      }
    );

    expect(
      reducer({
        needsResize: 1,
        shouldResize: 0,
        hasResized: 0,
        isMobile: false,
      }, {
        type: SET_NEEDS_RESIZE,
      })
    ).toEqual(
      {
        needsResize: 2,
        shouldResize: 0,
        hasResized: 0,
        isMobile: false,
      }
    );
  });

  it('should handle SET_SHOULD_RESIZE', () => {
    expect(
      reducer(defaultState, {
        type: SET_SHOULD_RESIZE,
      })
    ).toEqual(
      {
        needsResize: 0,
        shouldResize: 1,
        hasResized: 0,
        isMobile: false,
      }
    );

    expect(
      reducer({
        needsResize: 1,
        shouldResize: 1,
        hasResized: 0,
        isMobile: false,
      }, {
        type: SET_SHOULD_RESIZE,
      })
    ).toEqual(
      {
        needsResize: 1,
        shouldResize: 2,
        hasResized: 0,
        isMobile: false,
      }
    );
  });

  it('should handle SET_HAS_RESIZED', () => {
    expect(
      reducer(defaultState, {
        type: SET_HAS_RESIZED,
      })
    ).toEqual(
      {
        needsResize: 0,
        shouldResize: 0,
        hasResized: 1,
        isMobile: false,
      }
    );

    expect(
      reducer({
        needsResize: 1,
        shouldResize: 1,
        hasResized: 0,
        isMobile: false,
      }, {
        type: SET_HAS_RESIZED,
      })
    ).toEqual(
      {
        needsResize: 1,
        shouldResize: 1,
        hasResized: 1,
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
        shouldResize: 0,
        hasResized: 0,
        isMobile: false,
      }
    );

    expect(
      reducer({
        needsResize: 1,
        shouldResize: 0,
        hasResized: 0,
        isMobile: false,
      }, {
        type: SET_IS_MOBILE,
        isMobile: true,
      })
    ).toEqual(
      {
        needsResize: 1,
        shouldResize: 0,
        hasResized: 0,
        isMobile: true,
      }
    );
  });
});
