export function setNeedsResize(needsResize: boolean) {
  return {
    type: 'SET_NEEDS_RESIZE',
    needsResize,
  };
};

export function mobileDetect(isMobile: boolean) {
  return {
    type: 'SET_IS_MOBILE',
    isMobile,
  }
}