import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import * as types from '../constants';
import API from '../../api';
import { fetchAbout } from './aboutActions';

// This sets the mock adapter on the default instance
const mock = new MockAdapter(API);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('About Actions', () => {
  afterEach(() => {
    mock.reset();
  });

  it('creates RECIEVE_ABOUT when fetching nav has been done', () => {
    mock.onGet('/api/about.json').reply(
      200, {
        hero: {},
        description: {},
        brands: {},
        services: {},
        threeCs: 'hello, goodbye',
        teamOverview: {},
        members: {},
        clients: {},
        callToAction: {},
      },
    );

    const expectedActions = [{
      type: types.FETCH_ABOUT_STARTED,
    },
    {
      type: types.RECIEVE_ABOUT,
      payload: {
        hero: {},
        description: {},
        brands: {},
        services: {},
        threeCs: 'hello, goodbye',
        teamOverview: {},
        members: {},
        clients: {},
        callToAction: {},
      },
    },
    ];
    const store = mockStore({
      fetching: false,
      fetched: false,
      about: {},
      error: null,
    });

    return store.dispatch(fetchAbout()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECIEVE_ABOUT_ERROR when encountering error', () => {
    mock.onGet('/api/about.json').reply(
      404,
      [],
    );

    const store = mockStore({
      fetching: false,
      fetched: false,
      about: [],
      error: null,
    });

    return store.dispatch(fetchAbout()).then(() => {
      expect(store.getActions()).toEqual([{
        type: types.FETCH_ABOUT_STARTED,
      },
      expect.objectContaining({
        type: types.RECIEVE_ABOUT_ERROR,
        payload: expect.any(Error),
      }),
      ]);
    });
  });
});
