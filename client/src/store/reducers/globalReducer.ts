interface globalAction {
  type: 'SET_NEEDS_RESIZE' | 'SET_SHOULD_RESIZE' | 'SET_HAS_RESIZED' | 'SET_IS_MOBILE' | 'SET_APP_HEIGHT',
  isMobile?: boolean,
  height?: number,
}

export interface GlobalReducerInterface {
  needsResize: number,
  shouldResize: number,
  hasResized: number,
  appHeight: number,
  isMobile: boolean,
}

export default function reducer(state = {
  needsResize: 0,
  shouldResize: 0,
  hasResized: 0,
  appHeight: 0,
  isMobile: false,
}, action: globalAction) {
  switch (action.type) {
    case 'SET_NEEDS_RESIZE': {
      return {
        ...state,
        needsResize: state.needsResize + 1,
      };
    }
    case 'SET_APP_HEIGHT': {
      return {
        ...state,
        appHeight: action.height,
      };
    }
    case 'SET_SHOULD_RESIZE': {
      return {
        ...state,
        shouldResize: state.shouldResize + 1,
      };
    }
    case 'SET_HAS_RESIZED': {
      return {
        ...state,
        hasResized: state.hasResized + 1,
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
