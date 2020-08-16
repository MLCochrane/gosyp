export default function reducer(state = {
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
}, action) {
  switch (action.type) {
    case 'FETCH_HOMEPAGE_STARTED': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'RECIEVE_HOMEPAGE': {
      return {
        ...state,
        homepage: {
          ...state.homepage,
          ...action.payload,
        },
        fetched: true,
        fetching: false,
      };
    }
    case 'RECIEVE_HOMEPAGE_ERROR': {
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
