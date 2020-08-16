import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {
  fetchExpertise,
} from './expertiseActions';
import * as types from '../constants';
import API from '../../api';

const stubContent = {
  title: 'Brand Building',
  slug: 'brand-building',
  id: '123',
  subheader: 'We suh great plz build',
  blocks: [],
  clients: {},
  cta: {},
};

// This sets the mock adapter on the default instance
const mock = new MockAdapter(API);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Expertise Actions', () => {
  afterEach(() => {
    mock.reset();
  });

  it('creates RECIEVE_EXPERTISE when fetching done', () => {
    mock.onGet('/api/expertise/brand-building.json').reply(
      200,
      stubContent,
    );

    const expectedActions = [{
      type: types.FETCH_EXPERTISE_STARTED,
    },
    {
      type: types.RECIEVE_EXPERTISE,
      payload: stubContent,
    },
    ];
    const store = mockStore({
      fetching: false,
      fetched: false,
      expertise: {},
      error: null,
    });

    return store.dispatch(fetchExpertise('brand-building')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECIEVE_EXPERTISE_ERROR when encountering error', () => {
    mock.onGet('/api/expertise/brand.json').reply(
      404,
      [],
    );

    const store = mockStore({
      fetching: false,
      fetched: false,
      expertise: [],
      error: null,
    });

    return store.dispatch(fetchExpertise()).then(() => {
      expect(store.getActions()).toEqual([{
        type: types.FETCH_EXPERTISE_STARTED,
      },
      expect.objectContaining({
        type: types.RECIEVE_EXPERTISE_ERROR,
        payload: expect.any(Error),
      }),
      ]);
    });
  });
});
