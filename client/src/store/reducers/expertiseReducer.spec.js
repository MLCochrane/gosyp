import reducer from './expertiseReducer';
import * as types from '../constants';

const initState = {
  fetching: false,
  fetched: false,
  expertise: {
    title: '',
    slug: '',
    id: '',
    subheader: '',
    blocks: [],
    clients: {},
    cta: {},
  },
  error: null,
};

const stubContent = {
  title: 'Brand Building',
  slug: 'brand-building',
  id: '123',
  subheader: 'We suh great plz build',
  blocks: [],
  clients: {},
  cta: {},
};

describe('contact reducer', () => {
  it('should return default state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it('should handle FETCH_EXPERTISE_STARTED', () => {
    expect(
      reducer(
        undefined,
        {
          type: types.FETCH_EXPERTISE_STARTED,
        },
      ),
    ).toEqual(
      {
        fetching: true,
        fetched: false,
        expertise: {
          title: '',
          slug: '',
          id: '',
          subheader: '',
          blocks: [],
          clients: {},
          cta: {},
        },
        error: null,
      },
    );
  });

  it('should handle RECIEVE_EXPERTISE', () => {
    expect(
      reducer(
        initState,
        {
          type: types.RECIEVE_EXPERTISE,
          payload: stubContent,
        },
      ),
    ).toEqual(
      {
        fetching: false,
        fetched: true,
        expertise: {
          title: 'Brand Building',
          slug: 'brand-building',
          id: '123',
          subheader: 'We suh great plz build',
          blocks: [],
          clients: {},
          cta: {},
        },
        error: null,
      },
    );
  });

  it('should handle RECIEVE_EXPERTISE_ERROR', () => {
    expect(
      reducer(
        undefined, {
          type: types.RECIEVE_EXPERTISE_ERROR,
          payload: 'Error',
        },
      ),
    ).toEqual(
      {
        fetching: false,
        fetched: false,
        expertise: {
          title: '',
          slug: '',
          id: '',
          subheader: '',
          blocks: [],
          clients: {},
          cta: {},
        },
        error: 'Error',
      },
    );
  });
});
