export function setNeedsResize(resize: boolean) {
  return {
    type: 'SET_NEEDS_RESIZE',
    resize,
  };
};
