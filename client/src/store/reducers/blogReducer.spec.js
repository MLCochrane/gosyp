import reducer from './blogReducer';
import * as types from '../constants';

const initState = {
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
};

describe('blog reducer', () => {
  it('should return default state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it('should handle FETCH_BLOG_STARTED', () => {
    expect(
      reducer(
        undefined, {
          type: types.FETCH_BLOG_STARTED,
        },
      ),
    ).toEqual({
      fetching: true,
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
    });
  });

  it('should handle RECIEVE_POSTS', () => {
    // Full update
    expect(
      reducer(
        initState, {
          type: types.RECIEVE_POSTS,
          payload: {
            data: [
              {
                id: 1,
                date: 'March, 2015',
                title: 'Blog1',
                slug: 'blog',
                blocks: [],
              },
            ],
            meta: {
              pagination: {
                count: 1,
                total: 10,
              },
            },
          },
        },
      ),
    ).toEqual(
      {
        fetching: false,
        fetched: true,
        error: null,
        posts: {
          1: {
            id: 1,
            date: 'March, 2015',
            title: 'Blog1',
            slug: 'blog',
            blocks: [],
          },
        },
        slugToId: {
          blog: 1,
        },
        pagination: {
          count: 1,
          total: 10,
        },
        featuredPosts: [],
        postOrder: [1],
      },
    );

    // Appends
    expect(
      reducer(
        {
          fetching: false,
          fetched: false,
          posts: {
            1: {
              id: 1,
              date: 'March, 2015',
              title: 'Blog1',
              slug: 'blog',
              blocks: [],
            },
          },
          slugToId: {
            blog: 1,
          },
          postOrder: [1],
          featuredPosts: [],
          error: null,
        }, {
          type: types.RECIEVE_POSTS,
          payload: {
            data: [
              {
                id: 2,
                date: 'March, 2018',
                title: 'Blog2',
                slug: 'blog2',
                blocks: [],
              },
            ],
            meta: {
              pagination: {
                count: 1,
                total: 8,
              },
            },
          },
        },
      ),
    ).toEqual(
      {
        fetching: false,
        fetched: true,
        error: null,
        posts: {
          1: {
            id: 1,
            date: 'March, 2015',
            title: 'Blog1',
            slug: 'blog',
            blocks: [],
          },
          2: {
            id: 2,
            date: 'March, 2018',
            title: 'Blog2',
            slug: 'blog2',
            blocks: [],
          },
        },
        slugToId: {
          blog: 1,
          blog2: 2,
        },
        postOrder: [1, 2],
        featuredPosts: [],
        pagination: {
          count: 1,
          total: 8,
        },
      },
    );

    // Updates single
    expect(
      reducer(
        {
          fetching: false,
          fetched: false,
          posts: {
            1: {
              id: 1,
              date: 'March, 2015',
              title: 'Blog1',
              slug: 'blog',
              blocks: [],
            },
            2: {
              id: 2,
              date: 'March, 2018',
              title: 'Blog2',
              slug: 'blog2',
              blocks: [],
            },
          },
          slugToId: {
            blog: 1,
            blog2: 2,
          },
          postOrder: [1, 2],
          featuredPosts: [],
          error: null,
        }, {
          type: types.RECIEVE_POSTS,
          payload: {
            data: [
              {
                id: 2,
                date: 'March, 2018',
                title: 'Blog Renamed',
                slug: 'blog2',
                blocks: [],
              },
            ],
            meta: {
              pagination: {
                count: 2,
                total: 20,
              },
            },
          },
        },
      ),
    ).toEqual(
      {
        fetching: false,
        fetched: true,
        error: null,
        posts: {
          1: {
            id: 1,
            date: 'March, 2015',
            title: 'Blog1',
            slug: 'blog',
            blocks: [],
          },
          2: {
            id: 2,
            date: 'March, 2018',
            title: 'Blog Renamed',
            slug: 'blog2',
            blocks: [],
          },
        },
        slugToId: {
          blog: 1,
          blog2: 2,
        },
        postOrder: [1, 2],
        featuredPosts: [],
        pagination: {
          count: 2,
          total: 20,
        },
      },
    );
  });

  it('should handle RECIEVE_SINGLE_POST', () => {
    // updating
    expect(
      reducer(
        {
          fetching: false,
          fetched: false,
          posts: {
            1: {
              id: 1,
              date: 'March, 2015',
              title: 'Blog1',
              slug: 'blog',
              blocks: [],
            },
            2: {
              id: 2,
              date: 'March, 2018',
              title: 'Blog2',
              slug: 'blog2',
              blocks: [],
            },
          },
          slugToId: {
            blog: 1,
            blog2: 2,
          },
          postOrder: [1, 2],
          pagination: {
            count: 0,
            total: 0,
          },
          featuredPosts: [],
          error: null,
        }, {
          type: types.RECIEVE_SINGLE_POST,
          payload: {
            id: 1,
            date: 'March, 2015',
            title: 'Blog Renamed',
            slug: 'blog',
            blocks: [],
          },
        },
      ),
    ).toEqual(
      {
        fetching: false,
        fetched: true,
        error: null,
        posts: {
          1: {
            id: 1,
            date: 'March, 2015',
            title: 'Blog Renamed',
            slug: 'blog',
            blocks: [],
          },
          2: {
            id: 2,
            date: 'March, 2018',
            title: 'Blog2',
            slug: 'blog2',
            blocks: [],
          },
        },
        slugToId: {
          blog: 1,
          blog2: 2,
        },
        featuredPosts: [],
        postOrder: [1, 2],
        pagination: {
          count: 0,
          total: 0,
        },
      },
    );

    // Adding
    expect(
      reducer(
        {
          fetching: false,
          fetched: false,
          posts: {
            1: {
              id: 1,
              date: 'March, 2015',
              title: 'Blog Renamed',
              slug: 'blog',
              blocks: [],
            },
            2: {
              id: 2,
              date: 'March, 2018',
              title: 'Blog2',
              slug: 'blog2',
              blocks: [],
            },
          },
          slugToId: {
            blog: 1,
            blog2: 2,
          },
          postOrder: [1, 2],
          pagination: {
            count: 0,
            total: 0,
          },
          featuredPosts: [],
          error: null,
        }, {
          type: types.RECIEVE_SINGLE_POST,
          payload: {
            id: 3,
            date: 'March, 2015',
            title: 'Blog 3',
            slug: 'blog3',
            blocks: [],
          },
        },
      ),
    ).toEqual(
      {
        fetching: false,
        fetched: true,
        error: null,
        posts: {
          1: {
            id: 1,
            date: 'March, 2015',
            title: 'Blog Renamed',
            slug: 'blog',
            blocks: [],
          },
          2: {
            id: 2,
            date: 'March, 2018',
            title: 'Blog2',
            slug: 'blog2',
            blocks: [],
          },
          3: {
            id: 3,
            date: 'March, 2015',
            title: 'Blog 3',
            slug: 'blog3',
            blocks: [],
          },
        },
        slugToId: {
          blog: 1,
          blog2: 2,
          blog3: 3,
        },
        postOrder: [1, 2],
        featuredPosts: [],
        pagination: {
          count: 0,
          total: 0,
        },
      },
    );
  });

  it('should handle RECIEVE_FEATURED_POSTS', () => {
    expect(
      reducer(
        initState, {
          type: types.RECIEVE_FEATURED_POSTS,
          payload: ['1429', '1659'],
        },
      ),
    ).toEqual({
      fetching: false,
      fetched: false,
      posts: {},
      slugToId: {},
      postOrder: [],
      pagination: {
        count: 0,
        total: 0,
      },
      featuredPosts: ['1429', '1659'],
      error: null,
    });
  });

  it('should handle RECIEVE_BLOG_ERROR', () => {
    expect(
      reducer(
        undefined, {
          type: types.RECIEVE_BLOG_ERROR,
          payload: 'Error',
        },
      ),
    ).toEqual({
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
      error: 'Error',
    });
  });
});
