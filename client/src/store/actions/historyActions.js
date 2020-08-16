export function updateHistory(route) {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_HISTORY',
      payload: {
        route,
        path: window.location.pathname,
      },
    });
  };
}
