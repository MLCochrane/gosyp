import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { fetchHomepage } from './homeActions';
import * as types from '../constants';
import API from '../../api';

// This sets the mock adapter on the default instance
const mock = new MockAdapter(API);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Home Actions', () => {
  afterEach(() => {
    mock.reset();
  });

  it('creates RECIEVE_HOMEPAGE when fetching nav has been done', () => {
    mock.onGet('/api/homepage.json').reply(
      200,
      {
        featuredProjects: [],
        featuredBlurb: '',
        workLink: '/work/',
        firmTitle: 'Our Firm',
        firmCopy: '',
        servicesTitle: 'Core Services',
        servicesList: [],
        firmLink: '/about/',
      },
    );

    const expectedActions = [
      { type: types.FETCH_HOMEPAGE_STARTED },
      {
        type: types.RECIEVE_HOMEPAGE,
        payload:
        {
          featuredProjects: [],
          featuredBlurb: '',
          workLink: '/work/',
          firmTitle: 'Our Firm',
          firmCopy: '',
          servicesTitle: 'Core Services',
          servicesList: [],
          firmLink: '/about/',
        },
      },
    ];
    const store = mockStore({
      fetching: false,
      fetched: false,
      homepage: {},
      error: null,
    });

    return store.dispatch(fetchHomepage()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECIEVE_HOMEPAGE_ERROR when encountering error', () => {
    mock.onGet('/api/homepage.json').reply(
      404,
      [],
    );

    const store = mockStore({
      fetching: false,
      fetched: false,
      navigation: [],
      error: null,
    });

    return store.dispatch(fetchHomepage()).then(() => {
      expect(store.getActions()).toEqual([
        { type: types.FETCH_HOMEPAGE_STARTED },
        expect.objectContaining({
          type: types.RECIEVE_HOMEPAGE_ERROR,
          payload: expect.any(Error),
        }),
      ]);
    });
  });
});
