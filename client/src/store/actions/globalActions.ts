export function setNeedsResize() {
  return {
    type: 'SET_NEEDS_RESIZE',
  };
};

export function setAppHeight(height: number) {
  return {
    type: 'SET_APP_HEIGHT',
    height,
  };
};
export function setShouldResize() {
  return {
    type: 'SET_SHOULD_RESIZE',
  };
};

export function setHasResized() {
  return {
    type: 'SET_HAS_RESIZED',
  };
};

export function mobileDetect(isMobile: boolean) {
  return {
    type: 'SET_IS_MOBILE',
    isMobile,
  }
}