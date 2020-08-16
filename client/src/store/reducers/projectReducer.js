export default function reducer(state = {
  fetching: false,
  fetched: false,
  projects: [],
  error: null,
}, action) {
  const curProject = action.payload;
  const updatedProjects = [];

  switch (action.type) {
    case 'FETCH_PROJECTS_STARTED':
      return {
        ...state,
        fetching: true,
      };
    case 'RECIEVE_ALL_PROJECTS':
      return {
        ...state,
        fetched: true,
        fetching: false,
        projects: action.payload.data,
      };
    case 'RECIEVE_SINGLE_PROJECT':
      if (!state.projects.length) {
        updatedProjects.push(curProject);
      }
      state.projects.forEach((el, index, self) => {
        if (el.slug === curProject.slug) {
          // update
          updatedProjects.push(curProject);
        } else if (index === self.length - 1) {
          // append
          updatedProjects.push(el, curProject);
        } else {
          updatedProjects.push(el);
        }
      });

      return {
        ...state,
        fetched: true,
        fetching: false,
        projects: updatedProjects,
      };
    case 'RECIEVE_PROJECTS_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}
