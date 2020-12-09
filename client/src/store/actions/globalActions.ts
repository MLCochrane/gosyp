export function setNeedsResize() {
  return {
    type: 'SET_NEEDS_RESIZE',
  };
};

export function mobileDetect(isMobile: boolean) {
  return {
    type: 'SET_IS_MOBILE',
    isMobile,
  }
}