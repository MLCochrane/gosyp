import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { fetchContact } from './contactActions';
import * as types from '../constants';
import API from '../../api';

const stubContent = {
  hero: {
    header: 'Contact',
    image: 'http://192.168.99.100:80/assets/place3.png',
  },
  events: {
    header: 'Events',
    events: [{
      location: 'Ottawa ON',
      date: {
        date: '2020-07-10 00:00:00.000000',
        timezone_type: 3,
        timezone: 'America/Los_Angeles',
      },
      name: 'Event Name',
      description: 'Little bit of a description.',
      image: 'http://192.168.99.100:80/assets/place2.png',
    }],
  },
  form: {
    header: 'Work with Us',
    subheaderOne: 'Project Inquries',
    copyOne: 'Please reach out to Manda at manda@jackpine.co to set up a time to discuss your business challenge.',
    subheaderTwo: 'Join The Team',
    copyTwo: 'Looking to collaborate? Send a note to team@jackpine.co with your expertise and availability.',
    formTitle: 'Send a note',
  },
  press: {
    header: 'Press',
    subheader: 'Please direct media inquiries to manda@jackpine.co',
    articles: [{
      meta: {
        date: '2020-07-09 00:00:00.000000',
        timezone_type: 3,
        timezone: 'America/Los_Angeles',
      },
      title: 'Article Title',
      link: '/',
    }],
  },
  quotes: [{
    content: 'Jackpine was able to quickly understand a complex industry (that many people never understand) and gave us a brand with professional service and quick turnaround.',
    source: '– Margaret McGuffin, Executive Director at Music Publishers Canada',
  },
  {
    content: 'Jackpine was able to quickly understand a complex industry (that many people never understand) and gave us a brand with professional service and quick turnaround.',
    source: '– Margaret McGuffin, Executive Director at Music Publishers Canada',
  },
  ],
};

// This sets the mock adapter on the default instance
const mock = new MockAdapter(API);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Contact Actions', () => {
  afterEach(() => {
    mock.reset();
  });

  it('creates RECIEVE_CONTACT when fetching done', () => {
    mock.onGet('/api/contact.json').reply(
      200,
      stubContent,
    );

    const expectedActions = [
      { type: types.FETCH_CONTACT_STARTED },
      {
        type: types.RECIEVE_CONTACT,
        payload: stubContent,
      },
    ];
    const store = mockStore({
      fetching: false,
      fetched: false,
      contact: {},
      error: null,
    });

    return store.dispatch(fetchContact()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECIEVE_CONTACT_ERROR when encountering error', () => {
    mock.onGet('/api/contact.json').reply(
      404,
      [],
    );

    const store = mockStore({
      fetching: false,
      fetched: false,
      contact: {},
      error: null,
    });

    return store.dispatch(fetchContact()).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: types.FETCH_CONTACT_STARTED,
        },
        expect.objectContaining({
          type: types.RECIEVE_CONTACT_ERROR,
          payload: expect.any(Error),
        }),
      ]);
    });
  });
});
