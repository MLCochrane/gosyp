import reducer from './navReducer';
import * as types from '../constants';

const initState = {
  fetching: false,
  fetched: false,
  navigation: {
    blurb: '',
    links: [],
  },
  contactBlock: {
    socials: [],
    email: 'hello@jackpine.co',
    phone: '613-716-3372',
    newsletterText: 'Subscribe to',
    newsletterLink: '',
    newsletterLinkText: 'The Warbler',
  },
  newsletter: {
    title: '',
    text: '',
    link: '',
  },
  footer: {
    blurb: '',
    addressOne: '',
    addressTwo: '',
    copyright: '',
  },
  error: null,
};

describe('navigation reducer', () => {
  it('should return default state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it('should handle FETCH_NAVIGATION_STARTED', () => {
    expect(
      reducer(
        undefined,
        {
          type: types.FETCH_NAVIGATION_STARTED,
        },
      ),
    ).toEqual(
      {
        fetching: true,
        fetched: false,
        navigation: {
          blurb: '',
          links: [],
        },
        contactBlock: {
          socials: [],
          email: 'hello@jackpine.co',
          phone: '613-716-3372',
          newsletterText: 'Subscribe to',
          newsletterLink: '',
          newsletterLinkText: 'The Warbler',
        },
        newsletter: {
          title: '',
          text: '',
          link: '',
        },
        footer: {
          blurb: '',
          addressOne: '',
          addressTwo: '',
          copyright: '',
        },
        error: null,
      },
    );
  });

  it('should handle RECIEVE_NAVIGATION', () => {
    expect(
      reducer(
        initState,
        {
          type: types.RECIEVE_NAVIGATION,
          payload: {
            data: [
              {
                handle: 'navigation',
                blurb: 'Hello',
                links: [],
              },
              {
                handle: 'contactBlock',
                socials: [],
                email: 'test@test.com',
                phone: '17343352',
                newsletterText: 'Subscribe to',
                newsletterLink: '/dfjddf.com',
                newsletterLinkText: 'to The Warbler',
              },
              {
                handle: 'newsletter',
                title: 'Insights in your inbox',
                text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci, dolorem!',
                link: 'url.com',
              },
              {
                handle: 'footer',
                blurb: '',
                addressOne: '',
                addressTwo: '',
                copyright: 'Copyright Jackpine Dynamic Branding 2020',
              },
            ],
          },
        },
      ),
    ).toEqual(
      {
        fetching: false,
        fetched: true,
        navigation: {
          blurb: 'Hello',
          links: [],
        },
        contactBlock: {
          socials: [],
          email: 'test@test.com',
          phone: '17343352',
          newsletterText: 'Subscribe to',
          newsletterLink: '/dfjddf.com',
          newsletterLinkText: 'to The Warbler',
        },
        newsletter: {
          title: 'Insights in your inbox',
          text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci, dolorem!',
          link: 'url.com',
        },
        footer: {
          blurb: '',
          addressOne: '',
          addressTwo: '',
          copyright: 'Copyright Jackpine Dynamic Branding 2020',
        },
        error: null,
      },
    );

    expect(
      reducer(
        initState,
        {
          type: types.RECIEVE_NAVIGATION,
          payload: {
            data: [
              {
                handle: 'navigation',
                blurb: 'navigation',
                links: [{
                  title: 'Work',
                  url: 'url.com',
                }],
              },
              {
                handle: 'contactBlock',
                socials: [],
                email: '',
                phone: '',
                newsletterText: '',
                newsletterLink: '',
                newsletterLinkText: '',
              },
              {
                handle: 'newsletter',
                title: 'Insights in your inbox',
                text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci, dolorem!',
                link: 'url.com',
              },
              {
                handle: 'footer',
                blurb: 'We are jackpine',
                addressOne: 'Hiya',
                addressTwo: '',
                copyright: 'Copyright Jackpine Dynamic Branding 2020',
              },
            ],
          },
        },
      ),
    ).toEqual(
      {
        fetching: false,
        fetched: true,
        navigation:
      {
        blurb: 'navigation',
        links: [{
          title: 'Work',
          url: 'url.com',
        },
        ],
      },
        contactBlock: {
          socials: [],
          email: '',
          phone: '',
          newsletterText: '',
          newsletterLink: '',
          newsletterLinkText: '',
        },
        newsletter: {
          title: 'Insights in your inbox',
          text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci, dolorem!',
          link: 'url.com',
        },
        footer: {
          blurb: 'We are jackpine',
          addressOne: 'Hiya',
          addressTwo: '',
          copyright: 'Copyright Jackpine Dynamic Branding 2020',
        },
        error: null,
      },
    );
  });

  it('should handle RECIEVE_NAVIGATION_ERROR', () => {
    expect(
      reducer(
        undefined,
        {
          type: types.RECIEVE_NAVIGATION_ERROR,
          payload: 'Error',
        },
      ),
    ).toEqual(
      {
        fetching: false,
        fetched: false,
        navigation: {
          blurb: '',
          links: [],
        },
        contactBlock: {
          socials: [],
          email: 'hello@jackpine.co',
          phone: '613-716-3372',
          newsletterText: 'Subscribe to',
          newsletterLink: '',
          newsletterLinkText: 'The Warbler',
        },
        newsletter: {
          title: '',
          text: '',
          link: '',
        },
        footer: {
          blurb: '',
          addressOne: '',
          addressTwo: '',
          copyright: '',
        },
        error: 'Error',
      },
    );
  });
});
