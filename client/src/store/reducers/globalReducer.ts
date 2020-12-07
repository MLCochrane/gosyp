interface globalAction  {
  type: 'SET_NEEDS_RESIZE',
  needsResize: boolean,
}
export default function reducer(state = {
  needsResize: false,
}, action: globalAction) {
  switch (action.type) {
    case 'SET_NEEDS_RESIZE': {
      return {
        ...state,
        needsResize: action.needsResize,
      };
    }
    default:
      return state;
  }
}
