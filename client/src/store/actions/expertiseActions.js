import API from '../../api';

export function fetchExpertise(slug, params) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_EXPERTISE_STARTED' });
    return API.get(`/api/expertise/${slug}.json`, params)
      .then((res) => {
        dispatch({ type: 'RECIEVE_EXPERTISE', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'RECIEVE_EXPERTISE_ERROR', payload: err });
      });
  };
}
