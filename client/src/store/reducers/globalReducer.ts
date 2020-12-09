interface globalAction  {
  type: 'SET_NEEDS_RESIZE' | 'SET_IS_MOBILE',
  isMobile?: boolean,
}
export default function reducer(state = {
  needsResize: 0,
  isMobile: false,
}, action: globalAction) {
  switch (action.type) {
    case 'SET_NEEDS_RESIZE': {
      return {
        ...state,
        needsResize: state.needsResize + 1,
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
