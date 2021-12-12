import { takeEvery, put, all, call, AllEffect, CallEffect, PutEffect } from 'redux-saga/effects';
import { AUTH_LOG_OUT, AUTH_SIGN_IN } from '../constants/actions';
import { AuthAction } from '../types/actions';
import { getUserById } from '../../api/user';
import { authErrorAction, authSuccessAction } from '../actions/auth';
import { setAuthId } from '../../api/utils';

function* authSignIn(
  params: AuthAction,
): Generator<AllEffect<CallEffect<any>> | PutEffect<AuthAction>, void, [any, any]> {
  switch (params.type) {
    case AUTH_SIGN_IN:
      if (params.id) {
        try {
          const [apiResult] = yield all([call(getUserById, params.id as string)]);
          if ('id' in apiResult) {
            setAuthId(apiResult);
            yield put(authSuccessAction(apiResult));
          } else if ('error' in apiResult) {
            yield put(authErrorAction(apiResult.error.toString()));
          }
        } catch (e: any) {
          yield put(authErrorAction(e.toString()));
        }
      }
      break;
    case AUTH_LOG_OUT:
      setAuthId(undefined);
      break;
    default:
  }
}

export default function* authWatcher() {
  yield takeEvery(AUTH_SIGN_IN, authSignIn);
  yield takeEvery(AUTH_LOG_OUT, authSignIn);
}
