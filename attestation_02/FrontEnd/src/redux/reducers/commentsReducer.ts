/* Редьюсер для аутентификации */
import produce from 'immer';
import { CommentListState } from '../types/state';
import { CommentsAction } from '../types/actions';
import { COMMENTS_ERROR, COMMENTS_POST, COMMENTS_SUCCESS } from '../constants/actions';
import { getDefaultPageSize } from '../../api/utils';
import { COMMENTS_BY_POST } from '../../constants/api/dumMyApi';
import { CommentType } from '../../types/api/dumMyApiResponses';

const initialState: CommentListState = {
  error: '',
  comments: [],
  total: 0,
  page: 0,
  postId: '',
  pageSize: getDefaultPageSize(COMMENTS_BY_POST),
  isLoading: false,
};

const getByPost = (draft: CommentListState, action: CommentsAction): CommentListState => {
  if (action.postId) {
    draft.comments = [] as Array<CommentType>;
    draft.page = action.page || 0;
    draft.postId = action.postId;
    draft.pageSize = action.pageSize || getDefaultPageSize(COMMENTS_BY_POST);
    draft.isLoading = true;
  }
  return draft;
};

const onSuccess = (draft: CommentListState, action: CommentsAction): CommentListState => {
  if (action.comments) {
    draft.comments = action.comments;
  }
  draft.total = action.total || 0;
  draft.isLoading = false;
  return draft;
};
const commentsReducer = (state = initialState, action: CommentsAction) => produce(state, (draft: CommentListState) => {
  switch (action.type) {
    case COMMENTS_POST:
      return getByPost(draft, action);
    case COMMENTS_SUCCESS:
      return onSuccess(draft, action);
    case COMMENTS_ERROR:
      return draft;
    default:
      return state;
  }
});

export default commentsReducer;
