const fetch = require("./fetch");
const dumApi = require("../constants/dumMyApi");

module.exports = {
  get: (postId) => fetch.doGetRequest(dumApi.POST_URL.concat("/", postId)),

  getPostList: (page, limit) =>
    fetch.doGetRequest(dumApi.POST_URL, {
      [dumApi.PAGE_FIELD]: page || 0,
      [dumApi.LIMIT_FIELD]: limit || 10,
    }),

  getPostCommentList: (postId, page, limit) =>
    fetch.doGetRequest(
      dumApi.POST_URL.concat("/", postId, "/", dumApi.COMMENT_URL),
      { [dumApi.PAGE_FIELD]: page || 0, [dumApi.LIMIT_FIELD]: limit }
    ),
};
