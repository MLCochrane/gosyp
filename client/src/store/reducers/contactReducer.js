export default function reducer(state = {
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
}, action) {
  switch (action.type) {
    case 'FETCH_CONTACT_STARTED': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'RECIEVE_CONTACT': {
      return {
        ...state,
        contact: action.payload,
        fetched: true,
        fetching: false,
      };
    }
    case 'RECIEVE_CONTACT_ERROR': {
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
