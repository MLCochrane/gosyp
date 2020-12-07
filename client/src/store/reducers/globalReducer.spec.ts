import reducer from './globalReducer';
import {
  SET_NEEDS_RESIZE,
} from '../constants';

const defaultState = {
  needsResize: false,
};

describe('Global Reducer', () => {
  it('should handle RECEIVE_ROOM_ID', () => {
    expect(
      reducer(defaultState, {
        type: SET_NEEDS_RESIZE,
        needsResize: true,
      })
    ).toEqual(
      {
        needsResize: true,
      }
    );

    expect(
      reducer(defaultState, {
        type: SET_NEEDS_RESIZE,
        needsResize: false,
      })
    ).toEqual(
      {
        needsResize: false,
      }
    );
  });
});
