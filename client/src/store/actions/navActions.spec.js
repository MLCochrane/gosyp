import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { fetchNavigation } from './navActions';
import * as types from '../constants';
import API from '../../api';

// This sets the mock adapter on the default instance
const mock = new MockAdapter(API);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Nav Actions', () => {
  afterEach(() => {
    mock.reset();
  });

  it('creates RECIEVE_NAVIGATION when fetching nav has been done', () => {
    mock.onGet('/api/navigation.json').reply(
      200,
      [
        {
          handle: 'navigation',
        },
        {
          handle: 'contactBlock',
        },
      ],
    );

    const expectedActions = [
      { type: types.FETCH_NAVIGATION_STARTED },
      {
        type: types.RECIEVE_NAVIGATION,
        payload: [
          {
            handle: 'navigation',
          }, {
            handle: 'contactBlock',
          },
        ],
      },
    ];
    const store = mockStore({
      fetching: false,
      fetched: false,
      navigation: [],
      error: null,
    });

    return store.dispatch(fetchNavigation()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECIEVE_NAVIGATION_ERROR when encountering error', () => {
    mock.onGet('/api/navigation.json').reply(
      404,
      [],
    );

    const store = mockStore({
      fetching: false,
      fetched: false,
      navigation: [],
      error: null,
    });

    return store.dispatch(fetchNavigation()).then(() => {
      expect(store.getActions()).toEqual([
        { type: types.FETCH_NAVIGATION_STARTED },
        expect.objectContaining({
          type: types.RECIEVE_NAVIGATION_ERROR,
          payload: expect.any(Error),
        }),
      ]);
    });
  });
});
