export default function reducer(state = {
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
}, action) {
  switch (action.type) {
    case 'FETCH_EXPERTISE_STARTED': {
      return {
        ...state,
        fetching: true,
      };
    }
    case 'RECIEVE_EXPERTISE': {
      return {
        ...state,
        expertise: action.payload,
        fetched: true,
        fetching: false,
      };
    }
    case 'RECIEVE_EXPERTISE_ERROR': {
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
