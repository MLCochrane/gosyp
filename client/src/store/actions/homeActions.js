import API from '../../api';

export function fetchHomepage(search) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_HOMEPAGE_STARTED' });
    return API.get(`/api/homepage.json${search || ''}`)
      .then((res) => {
        dispatch({ type: 'RECIEVE_HOMEPAGE', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'RECIEVE_HOMEPAGE_ERROR', payload: err });
      });
  };
}
