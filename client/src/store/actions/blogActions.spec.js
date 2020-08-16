import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {
  fetchBlog,
  fetchSinglePost,
  fetchFeatured,
} from './blogActions';
import * as types from '../constants';
import API from '../../api';

// This sets the mock adapter on the default instance
const mock = new MockAdapter(API);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Blog Actions', () => {
  afterEach(() => {
    mock.reset();
  });

  it('creates RECIEVE_POSTS when fetching projects has been done', () => {
    mock.onGet('/api/blog.json').reply(
      200,
      [{
        title: 'Blog One',
        subheader: '',
        slug: 'proj_one',
        id: 1,
        blocks: {},
      },
      {
        title: 'Blog Two',
        subheader: '',
        slug: 'proj_two',
        id: 2,
        blocks: {},
      },
      ],
    );

    const expectedActions = [{
      type: types.FETCH_BLOG_STARTED,
    },
    {
      type: types.RECIEVE_POSTS,
      payload: [{
        title: 'Blog One',
        subheader: '',
        slug: 'proj_one',
        id: 1,
        blocks: {},
      },
      {
        title: 'Blog Two',
        subheader: '',
        slug: 'proj_two',
        id: 2,
        blocks: {},
      }],
    },
    ];
    const store = mockStore({
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
    });

    return store.dispatch(fetchBlog()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECIEVE_BLOG_ERROR when encountering error', () => {
    mock.onGet('/api/blog.json').reply(
      404,
      [],
    );

    const store = mockStore({
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
    });

    return store.dispatch(fetchBlog()).then(() => {
      expect(store.getActions()).toEqual([{
        type: types.FETCH_BLOG_STARTED,
      },
      expect.objectContaining({
        type: types.RECIEVE_BLOG_ERROR,
        payload: expect.any(Error),
      }),
      ]);
    });
  });

  it('creates RECIEVE_SINGLE_POST when fetching single', () => {
    mock.onGet('/api/blog/slug_here.json').reply(
      200,
      [{
        title: 'Blog One',
        slug: 'slug_here',
        id: 1,
        intro: {},
        blocks: {},
      }],
    );

    const expectedActions = [{
      type: types.FETCH_BLOG_STARTED,
    },
    {
      type: types.RECIEVE_SINGLE_POST,
      payload: [{
        title: 'Blog One',
        slug: 'slug_here',
        id: 1,
        intro: {},
        blocks: {},
      }],
    },
    ];
    const store = mockStore({
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
    });

    return store.dispatch(fetchSinglePost('slug_here')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECIEVE_FEATURED_POSTS when getting featured posts', () => {
    mock.onGet('/api/blog-featured.json').reply(
      200,
      {
        featuredMainPost: {
          id: '1429',
          date: 'June 30',
          slug: 'ottawa-senators-brand-under-fire',
          title: 'Ottawa Senators brand under fire.',
          excerpt: 'I spoke with the CBC earlier today about the branding challenge that Eugene Melnyk has created for the Ottawa Senators brand.',
          subheader: 'Subheader',
          featuredImage: {
            lqip: 'http://192.168.99.100:80/assets/_lqip/576/place3_200615_211944.jpg',
            src: 'http://192.168.99.100:80/assets/_featuredX1/576/place3_200615_211944.jpg',
            width: 556,
            height: 556,
            alt: '',
            srcset: 'http://192.168.99.100:80/assets/_featuredX1/576/place3_200615_211944.jpg 556w, http://192.168.99.100:80/assets/_featuredX2/576/place3_200615_211944.jpg 1012w',
          },
          blocks: [{
            type: 'text',
            header: null,
            copy: 'Eugene Melnyk has jeopardized his Ottawa Senators brand. It is salvageable, but he needs to act now. His top priority should be to re-establish trust with fans. Fans don’t want a letter. They want action. They want a plan. Placating passionate fans with buzzwords and PR speak is not going to work. Fans want Eugene Melnyk to put his money where his mouth his. He needs to invest in players, the experience, and the city.',
          }],
          related: [],
        },
        featuredMiddlePost: {
          id: '1659',
          date: 'June 30',
          slug: 'ottawa-senators-brand-under-fire',
          title: 'Ottawa Senators brand under fire.',
          excerpt: 'I spoke with the CBC earlier today about the branding challenge that Eugene Melnyk has created for the Ottawa Senators brand.',
          subheader: 'Subheader',
          featuredImage: {
            lqip: 'http://192.168.99.100:80/assets/_lqip/576/place3_200615_211944.jpg',
            src: 'http://192.168.99.100:80/assets/_featuredX1/576/place3_200615_211944.jpg',
            width: 556,
            height: 556,
            alt: '',
            srcset: 'http://192.168.99.100:80/assets/_featuredX1/576/place3_200615_211944.jpg 556w, http://192.168.99.100:80/assets/_featuredX2/576/place3_200615_211944.jpg 1012w',
          },
          blocks: [{
            type: 'text',
            header: null,
            copy: 'Eugene Melnyk has jeopardized his Ottawa Senators brand. It is salvageable, but he needs to act now. His top priority should be to re-establish trust with fans. Fans don’t want a letter. They want action. They want a plan. Placating passionate fans with buzzwords and PR speak is not going to work. Fans want Eugene Melnyk to put his money where his mouth his. He needs to invest in players, the experience, and the city.',
          }],
          related: [],
        },
      },
    );

    const store = mockStore({
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
    });

    return store.dispatch(fetchFeatured()).then(() => {
      expect(store.getActions()).toEqual([
        {
          type: types.FETCH_BLOG_STARTED,
        },
        {
          type: types.RECIEVE_SINGLE_POST,
          payload: {
            id: '1429',
            date: 'June 30',
            slug: 'ottawa-senators-brand-under-fire',
            title: 'Ottawa Senators brand under fire.',
            excerpt: 'I spoke with the CBC earlier today about the branding challenge that Eugene Melnyk has created for the Ottawa Senators brand.',
            subheader: 'Subheader',
            featuredImage: {
              lqip: 'http://192.168.99.100:80/assets/_lqip/576/place3_200615_211944.jpg',
              src: 'http://192.168.99.100:80/assets/_featuredX1/576/place3_200615_211944.jpg',
              width: 556,
              height: 556,
              alt: '',
              srcset: 'http://192.168.99.100:80/assets/_featuredX1/576/place3_200615_211944.jpg 556w, http://192.168.99.100:80/assets/_featuredX2/576/place3_200615_211944.jpg 1012w',
            },
            blocks: [{
              type: 'text',
              header: null,
              copy: 'Eugene Melnyk has jeopardized his Ottawa Senators brand. It is salvageable, but he needs to act now. His top priority should be to re-establish trust with fans. Fans don’t want a letter. They want action. They want a plan. Placating passionate fans with buzzwords and PR speak is not going to work. Fans want Eugene Melnyk to put his money where his mouth his. He needs to invest in players, the experience, and the city.',
            }],
            related: [],
          },
        },
        {
          type: types.RECIEVE_SINGLE_POST,
          payload: {
            id: '1659',
            date: 'June 30',
            slug: 'ottawa-senators-brand-under-fire',
            title: 'Ottawa Senators brand under fire.',
            excerpt: 'I spoke with the CBC earlier today about the branding challenge that Eugene Melnyk has created for the Ottawa Senators brand.',
            subheader: 'Subheader',
            featuredImage: {
              lqip: 'http://192.168.99.100:80/assets/_lqip/576/place3_200615_211944.jpg',
              src: 'http://192.168.99.100:80/assets/_featuredX1/576/place3_200615_211944.jpg',
              width: 556,
              height: 556,
              alt: '',
              srcset: 'http://192.168.99.100:80/assets/_featuredX1/576/place3_200615_211944.jpg 556w, http://192.168.99.100:80/assets/_featuredX2/576/place3_200615_211944.jpg 1012w',
            },
            blocks: [{
              type: 'text',
              header: null,
              copy: 'Eugene Melnyk has jeopardized his Ottawa Senators brand. It is salvageable, but he needs to act now. His top priority should be to re-establish trust with fans. Fans don’t want a letter. They want action. They want a plan. Placating passionate fans with buzzwords and PR speak is not going to work. Fans want Eugene Melnyk to put his money where his mouth his. He needs to invest in players, the experience, and the city.',
            }],
            related: [],
          },
        },
        {
          type: types.RECIEVE_FEATURED_POSTS,
          payload: ['1429', '1659'],
        },
      ]);
    });
  });
});
