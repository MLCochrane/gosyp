import API from '../../api';

export function fetchContact(params) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_CONTACT_STARTED' });
    return API.get(`/api/contact.json${params || ''}`)
      .then((res) => {
        dispatch({ type: 'RECIEVE_CONTACT', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'RECIEVE_CONTACT_ERROR', payload: err });
      });
  };
}
