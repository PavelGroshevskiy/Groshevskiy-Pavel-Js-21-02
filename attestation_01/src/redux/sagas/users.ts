import { takeEvery, put, all, call, AllEffect, CallEffect, PutEffect } from 'redux-saga/effects';
import { USERS_UPDATE, CREATE_USER, USERS_GET, USERS_LOAD, AVATAR_UPLOAD } from '../constants/actions';
import { UsersAction } from '../types/actions';
import { getUserById, getUserList, updateUser } from '../../api/user';
import { updateUserAction, usersErrorAction, usersGetSuccessAction, usersLoadSuccessAction } from '../actions/users';
import { setDefaultPageSize } from '../../api/utils';
import { USER_URL } from '../../constants/api/dumMyApi';
import { UserType } from '../../types/api/dumMyApiResponses';
import { authSuccessAction } from '../actions/auth';
import { uploadAvatar } from '../../api/avatar';

function* usersLoad(
  params: UsersAction,
): Generator<AllEffect<CallEffect<any>> | PutEffect<UsersAction>, void, [any, any]> {
  try {
    switch (params.type) {
      case USERS_GET:
        if (params.id) {
          const [apiResult] = yield all([call(getUserById, params.id as string)]);
          if ('id' in apiResult) {
            yield put(usersGetSuccessAction(apiResult));
          } else if ('error' in apiResult) {
            yield put(usersErrorAction(apiResult.error.toString()));
          }
        }
        break;
      case USERS_LOAD:
        if (params) {
          const [usersResult] = yield all([call(getUserList, Number(params.page), params.pageSize)]);
          if ('data' in usersResult) {
            setDefaultPageSize(usersResult.limit, USER_URL);
            yield put(usersLoadSuccessAction(usersResult));
          } else if ('error' in usersResult) {
            yield put(usersErrorAction(usersResult.error.toString()));
          }
        }
        break;
      case CREATE_USER:
        if (params) {
          const [createResult] = yield all([call(updateUser, params.user as UserType)]);
          if ('id' in createResult) {
            yield put(authSuccessAction(createResult));
          } else if ('error' in createResult && createResult.data) {
            yield put(usersErrorAction(Object.values(createResult.data).join('<br/>')));
          }
        }
        break;
      case USERS_UPDATE:
        if (params) {
          const [createResult] = yield all([call(updateUser, params.user as UserType)]);
          if ('id' in createResult) {
            yield put(usersGetSuccessAction(createResult));
          } else if ('error' in createResult && createResult.data) {
            yield put(usersErrorAction(Object.values(createResult.data).join('<br/>')));
          }
        }
        break;
      case AVATAR_UPLOAD:
        if ('avatar' in params && params.id) {
          const [avatarResult] = yield all([call(uploadAvatar, params.avatar as Blob)]);
          if ('success' in avatarResult && avatarResult.success === true) {
            yield put(updateUserAction({ id: params.id, picture: avatarResult.data.url }, true));
          } else {
            yield put(usersErrorAction(Object.values(avatarResult).join('<br/>')));
          }
        }
        break;
      default:
    }
  } catch (e: any) {
    yield put(usersErrorAction(e.toString()));
  }
}

export default function* usersWatcher() {
  yield takeEvery(USERS_GET, usersLoad);
  yield takeEvery(USERS_LOAD, usersLoad);
  yield takeEvery(CREATE_USER, usersLoad);
  yield takeEvery(USERS_UPDATE, usersLoad);
  yield takeEvery(AVATAR_UPLOAD, usersLoad);
}
