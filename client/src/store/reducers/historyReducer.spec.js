import reducer from './historyReducer';
import * as types from '../constants';

const initState = {
  route: '/',
  path: '',
  previous: '',
};

describe('history reducer', () => {
  it('should return default state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it('should handle UPDATE_HISTORY', () => {
    expect(
      reducer(
        initState, {
          type: types.UPDATE_HISTORY,
          payload: {
            route: '/projects/bestone',
            path: 'bestone',
          },
        },
      ),
    ).toEqual({
      route: '/projects/bestone',
      path: 'bestone',
      previous: '',
    });
  });
});
