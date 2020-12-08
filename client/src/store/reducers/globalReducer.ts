interface globalAction  {
  type: 'SET_NEEDS_RESIZE' | 'SET_IS_MOBILE',
  needsResize?: boolean,
  isMobile?: boolean,
}
export default function reducer(state = {
  needsResize: false,
  isMobile: false,
}, action: globalAction) {
  switch (action.type) {
    case 'SET_NEEDS_RESIZE': {
      return {
        ...state,
        needsResize: action.needsResize,
      };
    }
    case 'SET_IS_MOBILE': {
      return {
        ...state,
        isMobile: action.isMobile,
      };
    }
    default:
      return state;
  }
}
