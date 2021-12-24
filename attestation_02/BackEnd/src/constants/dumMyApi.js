const moment = require("moment");
const dumApi = {
  BASE_URL: "https://dummyapi.io/data/v1/",
  USER_URL: "user",
  USER_CREATE_URL: "user/create",
  POST_URL: "post",
  COMMENT_URL: "comment",
  APP_ID_VALUE: "61831de91d0b3f4e56b5ca55",
  APP_ID_FIELD: "app-id",
  PAGE_FIELD: "page",
  LIMIT_FIELD: "limit",
};

module.exports = {
  ...dumApi,
  COMMENTS_BY_USER: dumApi.USER_URL.concat("/", dumApi.COMMENT_URL),
  COMMENTS_BY_POST: dumApi.POST_URL.concat("/", dumApi.COMMENT_URL),
  POSTS_BY_USER: dumApi.USER_URL.concat("/", dumApi.POST_URL),
  minDate: moment().subtract(95, "year").startOf("day"),
  maxDate: moment().subtract(14, "year").startOf("day"),
};
