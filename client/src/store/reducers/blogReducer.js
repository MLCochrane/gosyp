export default function reducer(state = {
  fetching: false,
  fetched: false,
  posts: {},
  slugToId: {},
  postOrder: [],
  pagination: {
    count: 0,
    total: 0,
  },
  featuredPosts: [],
  error: null,
}, action) {
  switch (action.type) {
    case 'FETCH_BLOG_STARTED':
      return {
        ...state,
        fetching: true,
      };
    case 'RECIEVE_POSTS': {
      const newPostObj = { ...state.posts };
      const newSlugMapping = { ...state.slugToId };
      const updatedOrder = state.postOrder.slice();
      const incomingPosts = action.payload.data;

      incomingPosts.forEach((el) => {
        const postIdIndex = el.id;
        newPostObj[postIdIndex] = el;
        newSlugMapping[el.slug] = el.id;
        if (updatedOrder.indexOf(postIdIndex) === -1) updatedOrder.push(el.id);
      });

      const { count, total } = action.payload.meta.pagination;

      return {
        ...state,
        fetching: false,
        fetched: true,
        posts: newPostObj,
        slugToId: newSlugMapping,
        postOrder: updatedOrder,
        pagination: {
          count,
          total,
        },
      };
    }
    case 'RECIEVE_SINGLE_POST': {
      const newPostObj = { ...state.posts };
      const newSlugMapping = { ...state.slugToId };
      const incomingPost = action.payload;

      const postIdIndex = incomingPost.id;
      newPostObj[postIdIndex] = incomingPost;
      newSlugMapping[incomingPost.slug] = incomingPost.id;

      return {
        ...state,
        fetching: false,
        fetched: true,
        posts: newPostObj,
        slugToId: newSlugMapping,
      };
    }
    case 'RECIEVE_FEATURED_POSTS': {
      return {
        ...state,
        featuredPosts: action.payload,
      };
    }
    case 'RECIEVE_BLOG_ERROR':
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
