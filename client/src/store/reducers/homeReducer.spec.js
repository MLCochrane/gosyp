import reducer from './homeReducer';
import * as types from '../constants';

const initState = {
  fetching: false,
  fetched: false,
  homepage: {
    hero: {
      brandBuilding: [],
      creativeCounsel: [],
    },
    featuredProjects: [],
    featuredBlurb: '',
    workLink: '/work/',
    firmTitle: 'Our Firm',
    firmCopy: '',
    servicesTitle: 'Core Services',
    servicesList: [],
    firmLink: '/about/',
  },
  error: null,
};

describe('home reducer', () => {
  it('should return default state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it('should handle FETCH_HOMEPAGE_STARTED', () => {
    expect(
      reducer(
        undefined,
        {
          type: types.FETCH_HOMEPAGE_STARTED,
        },
      ),
    ).toEqual(
      {
        fetching: true,
        fetched: false,
        homepage: {
          hero: {
            brandBuilding: [],
            creativeCounsel: [],
          },
          featuredProjects: [],
          featuredBlurb: '',
          workLink: '/work/',
          firmTitle: 'Our Firm',
          firmCopy: '',
          servicesTitle: 'Core Services',
          servicesList: [],
          firmLink: '/about/',
        },
        error: null,
      },
    );
  });

  it('should handle RECIEVE_HOMEPAGE', () => {
    expect(
      reducer(
        initState,
        {
          type: types.RECIEVE_HOMEPAGE,
          payload: {
            featuredProjects: [
              '546',
              '534',
              '180',
              '50',
            ],
            featuredBlurb: 'Music Publishers Canada (formerly Canadian Music Publishers Association) needed a refreshed brand to engage policy-makers and potential new members. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis…',
            workLink: '/work/',
            firmTitle: 'Our Firm',
            firmCopy: 'Jackpine is a full-service, brand-building and creative counsel firm. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu.',
            servicesTitle: 'Core Services',
            servicesList: [
              'Branding',
              'Strategy',
              'Other Thing',
              'And Another',
            ],
            firmLink: '/about/',
          },
        },
      ),
    ).toEqual(
      {
        fetching: false,
        fetched: true,
        homepage: {
          hero: {
            brandBuilding: [],
            creativeCounsel: [],
          },
          featuredProjects: [
            '546',
            '534',
            '180',
            '50',
          ],
          featuredBlurb: 'Music Publishers Canada (formerly Canadian Music Publishers Association) needed a refreshed brand to engage policy-makers and potential new members. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis…',
          workLink: '/work/',
          firmTitle: 'Our Firm',
          firmCopy: 'Jackpine is a full-service, brand-building and creative counsel firm. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu.',
          servicesTitle: 'Core Services',
          servicesList: [
            'Branding',
            'Strategy',
            'Other Thing',
            'And Another',
          ],
          firmLink: '/about/',
        },
        error: null,
      },
    );
  });

  it('should handle RECIEVE_HOMEPAGE_ERROR', () => {
    expect(
      reducer(
        undefined, {
          type: types.RECIEVE_HOMEPAGE_ERROR,
          payload: 'Error',
        },
      ),
    ).toEqual(
      {
        fetching: false,
        fetched: false,
        homepage: {
          hero: {
            brandBuilding: [],
            creativeCounsel: [],
          },
          featuredProjects: [],
          featuredBlurb: '',
          workLink: '/work/',
          firmTitle: 'Our Firm',
          firmCopy: '',
          servicesTitle: 'Core Services',
          servicesList: [],
          firmLink: '/about/',
        },
        error: 'Error',
      },
    );
  });
});
