import { POSTS_USER, POSTS_ERROR, POSTS_SUCCESS, POSTS_LOAD, POSTS_GET, POSTS_SHOW, POSTS_HIDE } from '../constants/actions';
import { PostListResponse } from '../../types/api/dumMyApiResponses';
import { IPostsErrorAction,
  IPostsGetAction,
  IPostsGetByUserAction,
  IPostsHidePostAction,
  IPostsLoadAction,
  IPostsShowPostAction,
  PostsAction } from '../types/actions';
import { getDefaultPageSize } from '../../api/utils';
import { POSTS_BY_USER } from '../../constants/api/dumMyApi';

export const postsGetAction: IPostsGetAction = (postId) => ({
  type: POSTS_GET,
  postId,
  isLoading: true,
});

export const postsGetByUserAction: IPostsGetByUserAction = (id, page, pageSize) => ({
  type: POSTS_USER,
  posts: [],
  userid: id,
  page: page || 0,
  pageSize: pageSize || getDefaultPageSize(POSTS_BY_USER),
  isLoading: true,
});

export const postsShowPostAction: IPostsShowPostAction = (post) => ({
  type: POSTS_SHOW,
  post,
  isLoading: false,
});

export const postsHidePostAction: IPostsHidePostAction = () => ({
  type: POSTS_HIDE,
  isLoading: false,
});

export const postsLoadAction: IPostsLoadAction = (page, pageSize) => ({
  type: POSTS_LOAD,
  posts: [],
  page: page || 0,
  pageSize: pageSize || getDefaultPageSize(POSTS_BY_USER),
  isLoading: true,
});

export const postsSuccessAction = (resp: PostListResponse): PostsAction => ({
  type: POSTS_SUCCESS,
  posts: resp.data,
  page: resp.page,
  pageSize: resp.limit,
  total: resp.total,
  error: '',
  isLoading: false,
});

export const postsErrorAction: IPostsErrorAction = (error) => ({
  type: POSTS_ERROR,
  error,
  total: 0,
  page: 0,
  pageSize: getDefaultPageSize(POSTS_BY_USER),
  posts: [],
  isLoading: false,
});
