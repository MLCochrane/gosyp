import API from '../../api';

export function fetchBlog(search, params) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_BLOG_STARTED' });
    return API.get(`/api/blog.json${search || ''}`, { params })
      .then((res) => {
        dispatch({ type: 'RECIEVE_POSTS', payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: 'RECIEVE_BLOG_ERROR', payload: err });
      });
  };
}

export function fetchSinglePost(slug, search, params) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_BLOG_STARTED' });
    return API.get(`/api/blog/${slug}.json${search || ''}`, { params })
      .then((res) => {
        dispatch({
          type: 'RECIEVE_SINGLE_POST',
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({ type: 'RECIEVE_BLOG_ERROR', payload: err });
      });
  };
}

export function fetchFeatured(search, params) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_BLOG_STARTED' });
    return API.get(`/api/blog-featured.json${search || ''}`, { params })
      .then((res) => {
        dispatch({
          type: 'RECIEVE_SINGLE_POST',
          payload: res.data.featuredMainPost,
        });
        dispatch({
          type: 'RECIEVE_SINGLE_POST',
          payload: res.data.featuredMiddlePost,
        });
        dispatch({
          type: 'RECIEVE_FEATURED_POSTS',
          payload: [res.data.featuredMainPost.id, res.data.featuredMiddlePost.id],
        });
      })
      .catch((err) => {
        dispatch({ type: 'RECIEVE_BLOG_ERROR', payload: err });
      });
  };
}
