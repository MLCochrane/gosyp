import API from '../../api';

export function fetchAbout(params) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_ABOUT_STARTED' });
    return API.get(`/api/about.json${params || ''}`)
      .then((res) => {
        dispatch({ type: 'RECIEVE_ABOUT', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'RECIEVE_ABOUT_ERROR', payload: err });
      });
  };
}
