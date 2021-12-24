import {
  takeEvery, put, all, call, AllEffect, CallEffect, PutEffect,
} from 'redux-saga/effects';
import { COMMENTS_POST } from '../constants/actions';
import { CommentsAction } from '../types/actions';
import { getCommentListByPost } from '../../api/comment';
import { commentsByUserSuccessAction, commentsErrorAction } from '../actions/comments';
import { COMMENTS_PAGE_SIZE } from '../../constants/common';
import { setDefaultPageSize } from '../../api/utils';
import { COMMENTS_BY_POST } from '../../constants/api/dumMyApi';

function* commentsLoad(
  params: CommentsAction,
): Generator<AllEffect<CallEffect<any>> | PutEffect<CommentsAction>, void, [any, any]> {
  try {
    switch (params.type) {
      case COMMENTS_POST:
        if (params.postId) {
          const [apiResult] = yield all([
            call(getCommentListByPost, params.postId, params.page, params.pageSize || COMMENTS_PAGE_SIZE),
          ]);
          if ('data' in apiResult) {
            setDefaultPageSize(apiResult.limit, COMMENTS_BY_POST);
            yield put(commentsByUserSuccessAction(apiResult));
          } else if ('error' in apiResult) {
            yield put(commentsErrorAction(apiResult.error.toString()));
          }
        }
        break;
      default:
    }
  } catch (e: any) {
    yield put(commentsErrorAction(e.toString()));
  }
}

export default function* commentsWatcher() {
  yield takeEvery(COMMENTS_POST, commentsLoad);
}
