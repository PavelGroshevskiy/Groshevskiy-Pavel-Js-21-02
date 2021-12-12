import { doGetRequest } from './requests';
import { LIMIT_FIELD,
  PAGE_FIELD,
  POST_URL,
  POSTS_BY_USER,
  USER_URL } from '../constants/api/dumMyApi';
import { getDefaultPageSize } from './utils';

export const getPostById = (id: string) => doGetRequest(`${POST_URL}/${id}`);

export const getPostList = (page?: number, limit?: number) =>
  doGetRequest(POST_URL, {
    [PAGE_FIELD]: page || 0,
    [LIMIT_FIELD]: limit || getDefaultPageSize(POST_URL),
  });

export const getPostListByUser = (userid: string, page?: number, limit?: number) =>
  doGetRequest(USER_URL.concat('/', userid, '/', POST_URL), {
    [PAGE_FIELD]: page || 0,
    [LIMIT_FIELD]: limit || getDefaultPageSize(POSTS_BY_USER),
  });
