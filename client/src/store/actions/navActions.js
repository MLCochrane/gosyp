import API from '../../api';

export function fetchNavigation() {
  return (dispatch) => {
    dispatch({ type: 'FETCH_NAVIGATION_STARTED' });
    return API.get('/api/navigation.json')
      .then((res) => {
        dispatch({ type: 'RECIEVE_NAVIGATION', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'RECIEVE_NAVIGATION_ERROR', payload: err });
      });
  };
}
