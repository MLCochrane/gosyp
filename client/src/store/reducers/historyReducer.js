export default function reducer(state = {
  route: '/',
  path: '',
  previous: '',
}, action) {
  switch (action.type) {
    case 'UPDATE_HISTORY': {
      return {
        previous: state.path,
        route: action.payload.route,
        path: action.payload.path,
      };
    }
    default:
      return state;
  }
}
