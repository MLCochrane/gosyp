export default function reducer(state = {
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
}, action) {
  switch (action.type) {
    case 'FETCH_ABOUT_STARTED': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'RECIEVE_ABOUT': {
      return {
        ...state,
        about: action.payload,
        fetched: true,
        fetching: false,
      };
    }
    case 'RECIEVE_ABOUT_ERROR': {
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
