import reducer from './projectReducer';
import * as types from '../constants';

const initState = {
  fetching: false,
  fetched: false,
  projects: [],
  error: null,
};

const secondaryState = {
  fetching: false,
  fetched: false,
  error: null,
  projects: [{
    title: 'Project One',
    slug: 'project-one',
    intro: {},
    blocks: [],
  }, {
    title: 'Project Two',
    slug: 'project-two',
    intro: {},
    blocks: [{
      text: {},
    }],
  }],
};

describe('project reducer', () => {
  it('should return default state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it('should handle FETCH_PROJECTS_STARTED', () => {
    expect(
      reducer(
        undefined,
        {
          type: types.FETCH_PROJECTS_STARTED,
        },
      ),
    ).toEqual({
      fetching: true,
      fetched: false,
      projects: [],
      error: null,
    });
  });

  it('should handle RECIEVE_ALL_PROJECTS', () => {
    expect(
      reducer(
        initState, {
          type: types.RECIEVE_ALL_PROJECTS,
          payload: {
            data: [
              {
                title: 'Project One',
                slug: 'project-one',
                intro: {},
                blocks: [],
              },
            ],
          },
        },
      ),
    ).toEqual(
      {
        fetching: false,
        fetched: true,
        error: null,
        projects: [{
          title: 'Project One',
          slug: 'project-one',
          intro: {},
          blocks: [],
        }],
      },
    );

    expect(
      reducer(
        initState, {
          type: types.RECIEVE_ALL_PROJECTS,
          payload: {
            data: [
              {
                title: 'Project One',
                slug: 'project-one',
                intro: {},
                blocks: [],
              },
              {
                title: 'Project One',
                slug: 'project-one',
                intro: {},
                blocks: [{
                  text: {},
                }],
              },
            ],
          },
        },
      ),
    ).toEqual({
      fetching: false,
      fetched: true,
      error: null,
      projects: [
        {
          title: 'Project One',
          slug: 'project-one',
          intro: {},
          blocks: [],
        }, {
          title: 'Project One',
          slug: 'project-one',
          intro: {},
          blocks: [{
            text: {},
          }],
        },
      ],
    });
  });

  it('should handle RECIEVE_SINGLE_PROJECT', () => {
    expect(
      reducer(secondaryState, {
        type: types.RECIEVE_SINGLE_PROJECT,
        payload: {
          title: 'Project Three',
          slug: 'project-three',
          intro: {},
          blocks: [],
        },
      }),
    ).toEqual(
      {
        fetching: false,
        fetched: true,
        error: null,
        projects: [{
          title: 'Project One',
          slug: 'project-one',
          intro: {},
          blocks: [],
        }, {
          title: 'Project Two',
          slug: 'project-two',
          intro: {},
          blocks: [{
            text: {},
          }],
        }, {
          title: 'Project Three',
          slug: 'project-three',
          intro: {},
          blocks: [],
        },
        ],
      },
    );

    expect(
      reducer(secondaryState, {
        type: types.RECIEVE_SINGLE_PROJECT,
        payload: {
          title: 'Project Updated',
          slug: 'project-two',
          intro: {},
          blocks: [],
        },
      }),
    ).toEqual(
      {
        fetching: false,
        fetched: true,
        error: null,
        projects: [{
          title: 'Project One',
          slug: 'project-one',
          intro: {},
          blocks: [],
        }, {
          title: 'Project Updated',
          slug: 'project-two',
          intro: {},
          blocks: [],
        },
        ],
      },
    );
    expect(
      reducer(
        {
          fetching: false,
          fetched: true,
          error: null,
          projects: [],
        },
        {
          type: types.RECIEVE_SINGLE_PROJECT,
          payload: {
            title: 'Project Updated',
            slug: 'project-two',
            intro: {},
            blocks: [],
          },
        },
      ),
    ).toEqual(
      {
        fetching: false,
        fetched: true,
        error: null,
        projects: [
          {
            title: 'Project Updated',
            slug: 'project-two',
            intro: {},
            blocks: [],
          },
        ],
      },
    );
  });

  it('should handle RECIEVE_PROJECTS_ERROR', () => {
    expect(
      reducer(
        initState, {
          type: types.RECIEVE_PROJECTS_ERROR,
          payload: 'Error',
        },
      ),
    ).toEqual({
      fetching: false,
      fetched: false,
      projects: [],
      error: 'Error',
    });
  });
});
