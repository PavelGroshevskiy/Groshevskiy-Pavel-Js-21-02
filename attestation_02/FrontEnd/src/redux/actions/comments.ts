import { COMMENTS_ERROR, COMMENTS_POST } from '../constants/actions';
import { ICommentsErrorAction, ICommentsLoadByPostAction } from '../types/actions';
import { getDefaultPageSize } from '../../api/utils';
import { COMMENTS_BY_USER } from '../../constants/api/dumMyApi';
import { COMMENTS_PAGE_SIZE } from '../../constants/common';
import { CommentListResponse } from '../../../../../attestation_01/src/types/api/dumMyApiResponses';
import { CommentsAction } from '../../../../../attestation_01/src/redux/types/actions';
import { COMMENTS_SUCCESS } from '../../../../../attestation_01/src/redux/constants/actions';

export const commentsLoadByPostAction: ICommentsLoadByPostAction = (postId, page, pageSize) => {
  console.log('in action', postId);
  return {
    type: COMMENTS_POST,
    page: page || 0,
    pageSize: pageSize || COMMENTS_PAGE_SIZE,
    postId,
    isLoading: true,
  };
};

export const commentsByUserSuccessAction = (resp: CommentListResponse): CommentsAction => ({
  type: COMMENTS_SUCCESS,
  comments: resp.data,
  page: resp.page,
  pageSize: resp.limit,
  total: resp.total,
  error: '',
  isLoading: false,
});

export const commentsErrorAction: ICommentsErrorAction = (error) => ({
  type: COMMENTS_ERROR,
  error,
  total: 0,
  page: 0,
  pageSize: getDefaultPageSize(COMMENTS_BY_USER),
  comments: [],
  isLoading: false,
});
