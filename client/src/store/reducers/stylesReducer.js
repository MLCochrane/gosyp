export default function reducer(state = {
  invertColor: false,
  path: '/',
}, action) {
  switch (action.type) {
    case 'INVERT_COLOR': {
      return {
        invertColor: action.invert,
      };
    }
    default:
      return state;
  }
}
