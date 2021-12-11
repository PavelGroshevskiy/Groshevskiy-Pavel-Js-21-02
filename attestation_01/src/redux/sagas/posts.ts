import { takeEvery, put, all, call, AllEffect, CallEffect, PutEffect } from 'redux-saga/effects';
import { POSTS_LOAD, POSTS_USER } from '../constants/actions';
import { PostsAction } from '../types/actions';
import { postsErrorAction, postsSuccessAction } from '../actions/posts';
import { getPostList, getPostListByUser } from '../../api/post';
import { setDefaultPageSize } from '../../api/utils';
import { POST_URL } from '../../constants/api/dumMyApi';

function* postsSaga(
  params: PostsAction,
): Generator<AllEffect<CallEffect<any>> | PutEffect<PostsAction>, void, [any, any]> {
  try {
    params.pageSize && setDefaultPageSize(params.pageSize, POST_URL);
    const [postsResult] = (params.type === POSTS_USER && params.userid) ?
      yield all([call(getPostListByUser, params.userid, params.page, params.pageSize)])
      : yield all([call(getPostList, params.page, params.pageSize)]);
    if ('data' in postsResult) {
      setDefaultPageSize(postsResult.limit, POST_URL);
      yield put(postsSuccessAction(postsResult));
    } else if ('error' in postsResult) {
      yield put(postsErrorAction(postsResult.error.toString()));
    }
  } catch (e: any) {
    yield put(postsErrorAction(e.toString()));
  }
}

export default function* postsWatcher() {
  yield takeEvery(POSTS_USER, postsSaga);
  yield takeEvery(POSTS_LOAD, postsSaga);
}
