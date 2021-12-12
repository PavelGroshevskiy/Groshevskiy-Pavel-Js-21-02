import { doGetRequest, doPostRequest } from './requests';
import { LIMIT_FIELD, PAGE_FIELD, USER_CREATE_URL, USER_URL } from '../constants/api/dumMyApi';
import { UserType } from '../types/api/dumMyApiResponses';
import { getDefaultPageSize } from './utils';
import { METHOD_PUT } from '../constants/common';

export const getUserById = (id: string) => doGetRequest(`${USER_URL}/${id}`);

export const getUserList = (page: number, pageSize?: number) =>
  doGetRequest(USER_URL, {
    [PAGE_FIELD]: page,
    [LIMIT_FIELD]: pageSize || getDefaultPageSize(USER_URL),
  });

export const updateUser = (user: UserType) => {
  if (user.id) {
    const { id } = user;
    delete user.id;
    return doPostRequest(USER_URL.concat('/', id), user, METHOD_PUT);
  }
  return doPostRequest(USER_CREATE_URL, user);
};
