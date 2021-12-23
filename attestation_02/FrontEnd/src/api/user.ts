import { produce } from 'immer';
import { doGetRequest, doPostRequest } from './requests';
import { BASE_URL, USER_CREATE_URL, USER_URL } from '../constants/api/myApi';
import { UserType } from '../types/api/dumMyApiResponses';
import { getDefaultPageSize } from './utils';
import { METHOD_PUT } from '../constants/common';
import { IMGBB_PARAMIMAGE } from '../constants/api/imgDbApi';

export const getUserById = (id: string) => doGetRequest(`${USER_URL}/${id}`);

export const getUserList = (page: number, pageSize?: number) => doGetRequest(
  USER_URL.concat('/', page.toString(), '/', pageSize?.toString() || getDefaultPageSize(USER_URL).toString()),
  {},
);

export const updateUser = (user: UserType) => {
  if (user.id) {
    return doPostRequest(
      USER_URL.concat('/', user.id),
      produce(user, (draft) => {
        delete draft.id;
      }),
      METHOD_PUT,
    );
  }
  return doPostRequest(USER_CREATE_URL, user);
};

export const updateAvatar = (userId: string, file: Blob) => {
  if (userId) {
    const formData = new FormData();
    formData.set(IMGBB_PARAMIMAGE, file);
    return fetch(BASE_URL.concat(USER_URL, '/', userId.toString(), '/avatar'), {
      method: METHOD_PUT,
      body: formData,
    }).then((response) => response.json());
  }
  return { error: 'error', data: 'no user id' };
};
