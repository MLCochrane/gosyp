export default function reducer(state = {
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
}, action) {
  switch (action.type) {
    case 'FETCH_NAVIGATION_STARTED': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'RECIEVE_NAVIGATION': {
      const nav = action.payload.data.filter((el) => el.handle === 'navigation')[0];
      delete nav.handle;

      const contact = action.payload.data.filter((el) => el.handle === 'contactBlock')[0];
      delete contact.handle;

      const footer = action.payload.data.filter((el) => el.handle === 'footer')[0];
      delete footer.handle;

      const newsletter = action.payload.data.filter((el) => el.handle === 'newsletter')[0];
      delete newsletter.handle;
      return {
        ...state,
        navigation: nav,
        contactBlock: contact,
        footer,
        newsletter,
        fetched: true,
        fetching: false,
      };
    }
    case 'RECIEVE_NAVIGATION_ERROR': {
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
}
