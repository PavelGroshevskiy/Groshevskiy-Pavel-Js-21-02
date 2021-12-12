/* Редьюсер для аутентификации */
import produce from 'immer';
import { PostsAction } from '../types/actions';
import { POSTS_ERROR, POSTS_HIDE, POSTS_LOAD, POSTS_SHOW, POSTS_SUCCESS, POSTS_USER } from '../constants/actions';
import { PostListState } from '../types/state';
import { getDefaultPageSize } from '../../api/utils';
import { POST_URL, POSTS_BY_USER } from '../../constants/api/dumMyApi';
import { PostPreview, PostType } from '../../types/api/dumMyApiResponses';

const initialState: PostListState = {
  error: '',
  post: {} as PostPreview,
  posts: [] as Array<PostType>,
  page: 0,
  pageSize: getDefaultPageSize(POST_URL),
  total: 0,
  isLoading: true,
};

const getByUser = (draft: PostListState, action: PostsAction, keyName: string): PostListState => {
  draft.page = action.page || 0;
  draft.pageSize = action.pageSize || getDefaultPageSize(keyName);
  draft.isLoading = true;
  return draft;
};

const onSuccess = (draft: PostListState, action: PostsAction): PostListState => {
  draft.posts = action.posts || [];
  draft.total = action.total || 0;
  draft.isLoading = false;
  return draft;
};

const onError = (draft: PostListState, error: string) => {
  draft.isLoading = false;
  draft.posts = [];
  draft.total = 0;
  draft.page = 0;
  draft.pageSize = getDefaultPageSize(POST_URL);
  draft.error = error;
  return draft;
};

const show = (draft: PostListState, post: PostPreview) => {
  draft.isLoading = false;
  draft.post = post;
  return draft;
};

const hide = (draft: PostListState) => {
  draft.isLoading = false;
  draft.post = {} as PostPreview;
  return draft;
};

const postsReducer = (state = initialState, action: PostsAction) =>
  produce(state, (draft: PostListState) => {
    switch (action.type) {
      case POSTS_SHOW:
        return show(draft, action.post as PostPreview);
      case POSTS_HIDE:
        return hide(draft);
      case POSTS_USER:
        return getByUser(draft, action, POSTS_BY_USER);
      case POSTS_LOAD:
        return getByUser(draft, action, POST_URL);
      case POSTS_SUCCESS:
        return onSuccess(draft, action);
      case POSTS_ERROR:
        return onError(draft, action.error as string);
      default:
        return state;
    }
  });

export default postsReducer;
