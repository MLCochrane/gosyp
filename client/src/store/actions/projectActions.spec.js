import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {
  fetchProjects,
  fetchSingleProject,
} from './projectActions';
import * as types from '../constants';
import API from '../../api';

// This sets the mock adapter on the default instance
const mock = new MockAdapter(API);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Project Actions', () => {
  afterEach(() => {
    mock.reset();
  });

  it('creates RECIEVE_ALL_PROJECTS when fetching projects has been done', () => {
    mock.onGet('/api/projects.json').reply(
      200,
      [
        {
          title: 'Project One',
          slug: 'proj_one',
          id: 1,
          intro: {},
          blocks: {},
        },
        {
          title: 'Project Two',
          slug: 'proj_two',
          id: 2,
          intro: {},
          blocks: {},
        },
      ],
    );

    const expectedActions = [
      { type: types.FETCH_PROJECTS_STARTED },
      {
        type: types.RECIEVE_ALL_PROJECTS,
        payload: [
          {
            title: 'Project One',
            slug: 'proj_one',
            id: 1,
            intro: {},
            blocks: {},
          }, {
            title: 'Project Two',
            slug: 'proj_two',
            id: 2,
            intro: {},
            blocks: {},
          },
        ],
      },
    ];
    const store = mockStore({
      fetching: false,
      fetched: false,
      projects: [],
      error: null,
    });

    return store.dispatch(fetchProjects()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECIEVE_PROJECTS_ERROR when encountering error', () => {
    mock.onGet('/api/projects.json').reply(
      404,
      [],
    );

    const store = mockStore({
      fetching: false,
      fetched: false,
      navigation: [],
      error: null,
    });

    return store.dispatch(fetchProjects()).then(() => {
      expect(store.getActions()).toEqual([
        { type: types.FETCH_PROJECTS_STARTED },
        expect.objectContaining({
          type: types.RECIEVE_PROJECTS_ERROR,
          payload: expect.any(Error),
        }),
      ]);
    });
  });

  it('creates RECIEVE_SINGLE_PROJECT when fetching single', () => {
    mock.onGet('/api/projects/slug_here.json').reply(
      200,
      [
        {
          title: 'Project One',
          slug: 'slug_here',
          id: 1,
          intro: {},
          blocks: {},
        },
      ],
    );

    const expectedActions = [
      { type: types.FETCH_PROJECTS_STARTED },
      {
        type: types.RECIEVE_SINGLE_PROJECT,
        payload: [
          {
            title: 'Project One',
            slug: 'slug_here',
            id: 1,
            intro: {},
            blocks: {},
          },
        ],
      },
    ];
    const store = mockStore({
      fetching: false,
      fetched: false,
      projects: [],
      error: null,
    });

    return store.dispatch(fetchSingleProject('slug_here')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
