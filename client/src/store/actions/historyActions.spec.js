import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  updateHistory,
} from './historyActions';
import * as types from '../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('History Actions', () => {
  it('creates UPDATE_HISTORY', () => {
    const expectedActions = [{
      type: types.UPDATE_HISTORY,
      payload: {
        route: '/projects/big',
        path: '/',
      },
    },
    ];
    const store = mockStore({
      route: '/',
      path: '',
      previous: '',
    });

    store.dispatch(updateHistory('/projects/big'));
    // return of async actions
    expect(store.getActions()).toEqual(expectedActions);
  });
});
