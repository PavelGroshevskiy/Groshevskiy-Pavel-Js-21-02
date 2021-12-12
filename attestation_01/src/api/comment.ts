import { doGetRequest } from './requests';
import { LIMIT_FIELD,
  PAGE_FIELD,
  COMMENT_URL,
  USER_URL,
  COMMENTS_BY_USER,
  POST_URL,
  COMMENTS_BY_POST } from '../constants/api/dumMyApi';
import { getDefaultPageSize } from './utils';

export const getCommentList = (page: number, limit: number) =>
  doGetRequest(COMMENT_URL, {
    [PAGE_FIELD]: page,
    [LIMIT_FIELD]: limit,
  });

export const getCommentListByUser = (userid: string, page?: number, limit?: number) =>
  doGetRequest(USER_URL.concat('/', userid, '/', COMMENT_URL), {
    [PAGE_FIELD]: page || 0,
    [LIMIT_FIELD]: limit || getDefaultPageSize(COMMENTS_BY_USER),
  });

export const getCommentListByPost = (postId: string, page?: number, limit?: number) =>
  doGetRequest(POST_URL.concat('/', postId, '/', COMMENT_URL), {
    [PAGE_FIELD]: page || 0,
    [LIMIT_FIELD]: limit || getDefaultPageSize(COMMENTS_BY_POST),
  });
