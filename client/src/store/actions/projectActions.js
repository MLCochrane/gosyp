import API from '../../api';

export function fetchProjects(params) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_PROJECTS_STARTED' });
    return API.get(`/api/projects.json${params || ''}`)
      .then((res) => {
        dispatch({ type: 'RECIEVE_ALL_PROJECTS', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'RECIEVE_PROJECTS_ERROR', payload: err });
      });
  };
}

export function fetchSingleProject(slug, params) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_PROJECTS_STARTED' });
    return API.get(`/api/projects/${slug}.json${params || ''}`)
      .then((res) => {
        dispatch({
          type: 'RECIEVE_SINGLE_PROJECT',
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({ type: 'RECIEVE_PROJECTS_ERROR', payload: err });
      });
  };
}
