import moment from 'moment';

export const BASE_URL = 'http://127.0.0.1:3000/api/';
export const USER_URL = 'user';
export const USER_CREATE_URL = 'user';
export const POST_URL = 'post';
export const COMMENT_URL = 'comment';
export const APP_ID_VALUE = '61831de91d0b3f4e56b5ca55';
export const APP_ID_FIELD = 'app-id';
export const PAGE_FIELD = 'page';
export const LIMIT_FIELD = 'limit';
export const COMMENTS_BY_USER = USER_URL.concat('/', COMMENT_URL);
export const COMMENTS_BY_POST = POST_URL.concat('/', COMMENT_URL);
export const POSTS_BY_USER = USER_URL.concat('/', POST_URL);

export const minDate = moment(new Date()).subtract(95, 'year').startOf('day');
export const maxDate = moment(new Date()).subtract(14, 'year').startOf('day');
