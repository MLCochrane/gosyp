import reducer from './contactReducer';
import * as types from '../constants';

const initState = {
  fetching: false,
  fetched: false,
  contact: {
    hero: {},
    events: {},
    form: {},
    press: {},
    quotes: {},
  },
  error: null,
};

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

describe('contact reducer', () => {
  it('should return default state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it('should handle FETCH_CONTACT_STARTED', () => {
    expect(
      reducer(
        undefined,
        {
          type: types.FETCH_CONTACT_STARTED,
        },
      ),
    ).toEqual(
      {
        fetching: true,
        fetched: false,
        contact: {
          hero: {},
          events: {},
          form: {},
          press: {},
          quotes: {},
        },
        error: null,
      },
    );
  });

  it('should handle RECIEVE_CONTACT', () => {
    expect(
      reducer(
        initState,
        {
          type: types.RECIEVE_CONTACT,
          payload: stubContent,
        },
      ),
    ).toEqual(
      {
        fetching: false,
        fetched: true,
        contact: {
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
        },
        error: null,
      },
    );
  });

  it('should handle RECIEVE_CONTACT_ERROR', () => {
    expect(
      reducer(
        undefined, {
          type: types.RECIEVE_CONTACT_ERROR,
          payload: 'Error',
        },
      ),
    ).toEqual(
      {
        fetching: false,
        fetched: false,
        contact: {
          hero: {},
          events: {},
          form: {},
          press: {},
          quotes: {},
        },
        error: 'Error',
      },
    );
  });
});
