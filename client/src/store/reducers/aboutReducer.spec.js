import reducer from './aboutReducer';
import * as types from '../constants';

const initState = {
  fetching: false,
  fetched: false,
  about: {
    hero: {},
    description: {},
    brands: {},
    services: {},
    threeCs: 'Creativity, Curiosity, Commitment',
    teamOverview: {},
    members: {},
    clients: {},
    callToAction: {},
  },
  error: null,
};

const payload = {
  hero: {
    header: 'Branding building and creative counsel',
    subheader: 'We believe in a world where positive transformation is always possible.',
  },
  description: {
    image: 'http://192.168.99.100:80/assets/place2.png',
    titleOne: 'Our Firm',
    copyOne: 'Jackpine is a full-service, brand-building and creative counsel firm. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu.',
    titleTwo: 'Process',
    copyTwo: 'Regardless of the project scale, we work with our clients to understand their unique challenges, develop strategies to solve them, and bring those solutions to life. This process can be as quick as a day or as extensive as several months, depending on the challenge.',
  },
  brands: {
    header: 'Dynamic Brands',
    copy: 'Tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu.',
    image: 'http://192.168.99.100:80/assets/place2.png',
  },
  services: {
    counselTitle: 'Creative counsel',
    counselList: ['Lorem ipsum', 'Lorem ipsum'],
    brandTitle: 'Brand building',
    brandList: ['Lorem Ipsum', 'Lorem ipsum', 'lorem ipsum'],
  },
  threeCs: 'Creativity, Curiosity, Commitment',
  teamOverview: {
    header: 'Tailored Teams',
    copy: 'Tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu.',
    image: 'http://192.168.99.100:80/assets/tailored-teams.jpg',
  },
  members: {
    core: [{
      name: 'Liam Mooney',
      role: 'CEO & Strategic Lead',
      email: 'liam@jackpine.co',
      image: 'http://192.168.99.100:80/assets/place3.png',
      socials: [''],
    }, {
      name: 'Emma Cochrane',
      role: 'Principal, Creative Director',
      email: 'emma@jackpine.co',
      image: 'http://192.168.99.100:80/assets/place3.png',
      socials: [''],
    }, {
      name: 'Manda Zalac',
      role: 'Admin',
      email: 'manda@jackpine.co',
      image: null,
      socials: [''],
    }, {
      name: 'Edie Wawrychuk',
      role: 'Project Manager',
      email: 'edie@jackpine.co',
      image: null,
      socials: [''],
    }],
    extended: [{
      title: 'Design',
      members: ['John Doe', 'Jane Smith'],
    },
    {
      title: 'Development',
      members: ['Jane Doe', 'John Smith'],
    },
    {
      title: 'Digital Marketing',
      members: ['John Doe'],
    },
    {
      title: 'Copy & Strategy',
      members: ['Jane Doe'],
    },
    {
      title: 'Photo/Video',
      members: ['John Smith'],
    },
    {
      title: 'Build',
      members: ['Jane Doe'],
    },
    ],
  },
  clients: {
    header: 'Select Clients',
    logo: ['http://192.168.99.100:80/assets/place3_200615_211944.png'],
  },
  callToAction: {
    header: 'No project is too small (or too big).',
    copy: 'Working with an agency doesn’t have to be complex or \nexpensive. We’re happy to talk through your big ideas or take on \na quick project that’s been stuck on your to-do list.',
  },
};

describe('about reducer', () => {
  it('should return default state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it('should handle FETCH_ABOUT_STARTED', () => {
    expect(
      reducer(
        undefined, {
          type: types.FETCH_ABOUT_STARTED,
        },
      ),
    ).toEqual({
      fetching: true,
      fetched: false,
      about: {
        hero: {},
        description: {},
        brands: {},
        services: {},
        threeCs: 'Creativity, Curiosity, Commitment',
        teamOverview: {},
        members: {},
        clients: {},
        callToAction: {},
      },
      error: null,
    });
  });

  it('should handle RECIEVE_ABOUT', () => {
    expect(
      reducer(
        initState, {
          type: types.RECIEVE_ABOUT,
          payload,
        },
      ),
    ).toEqual({
      fetching: false,
      fetched: true,
      about: payload,
      error: null,
    });
  });

  it('sould handle RECIEVE_ABOUT_ERROR', () => {
    expect(
      reducer(
        undefined, {
          type: types.RECIEVE_ABOUT_ERROR,
          payload: 'Error',
        },
      ),
    ).toEqual(
      {
        fetching: false,
        fetched: false,
        about: initState.about,
        error: 'Error',
      },
    );
  });
});
