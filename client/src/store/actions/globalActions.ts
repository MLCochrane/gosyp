export interface GlobalActionInterface {
  type: 'SET_NEEDS_RESIZE' | 'SET_SHOULD_RESIZE' | 'SET_HAS_RESIZED' | 'SET_IS_MOBILE' | 'SET_APP_HEIGHT',
  isMobile?: boolean,
  height?: number,
}

export function setNeedsResize(): GlobalActionInterface {
  return {
    type: 'SET_NEEDS_RESIZE',
  };
}

export function setAppHeight(height: number): GlobalActionInterface {
  return {
    type: 'SET_APP_HEIGHT',
    height,
  };
}
export function setShouldResize(): GlobalActionInterface {
  return {
    type: 'SET_SHOULD_RESIZE',
  };
}

export function setHasResized(): GlobalActionInterface {
  return {
    type: 'SET_HAS_RESIZED',
  };
}

export function mobileDetect(isMobile: boolean): GlobalActionInterface {
  return {
    type: 'SET_IS_MOBILE',
    isMobile,
  };
}
