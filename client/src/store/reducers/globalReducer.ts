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
      /**
       * Admittedly this feels strange to me, but
       * I think this is an improvement over setting
       * a boolean. Don't really need an on/off state,
       * just something to trigger a resize so simply
       * incrementing the number should do that.
       *
       * Perhaps the name and value should be adjusted
       * to something like, "TRIGGER_RESIZE_TIME" and
       * a timestamp? Not sure if that's any more helpful
       * or if there's just a better pairing between the
       * two.
       */
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
