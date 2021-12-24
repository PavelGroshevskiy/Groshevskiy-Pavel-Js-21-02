import { doGetRequest } from './requests';
import { POST_URL, POSTS_BY_USER, USER_URL } from '../constants/api/myApi';
import { getDefaultPageSize } from './utils';

export const getPostById = (id: string) => doGetRequest(`${POST_URL}/${id}`);

export const getPostList = (page?: number, limit?: number) => doGetRequest(
  POST_URL.concat('/', page?.toString() || '0', '/', limit?.toString() || getDefaultPageSize(POST_URL).toString()),
  {},
);

export const getPostListByUser = (userid: string, page?: number, limit?: number) => doGetRequest(
  USER_URL.concat(
    '/',
    userid,
    '/',
    POST_URL,
    '/',
    (page || 0).toString(),
    '/',
    (limit || getDefaultPageSize(POSTS_BY_USER)).toString(),
  ),
  {},
);
