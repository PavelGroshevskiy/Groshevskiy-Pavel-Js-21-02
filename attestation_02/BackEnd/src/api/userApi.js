const fetch = require("./fetch");
const dumApi = require("../constants/dumMyApi");
const common = require("../constants/common");

module.exports = {
  get: (userId) => fetch.doGetRequest(dumApi.USER_URL.concat("/", userId)),

  getUserList: (page, limit) =>
    fetch.doGetRequest(dumApi.USER_URL, {
      [dumApi.PAGE_FIELD]: page || 0,
      [dumApi.LIMIT_FIELD]: limit || 10,
    }),

  getPostListByUser: (userId, page, limit) =>
    fetch.doGetRequest(
      dumApi.USER_URL.concat("/", userId, "/", dumApi.POST_URL),
      {
        [dumApi.PAGE_FIELD]: page || 0,
        [dumApi.LIMIT_FIELD]: limit || 10,
      }
    ),

  updateUser: (userId, user) => {
    "dateOfBirth" in user ? (user.dateOfBirth = user.dateOfBirth.date) : null;
    if (userId) {
      return fetch.doPostRequest(
        dumApi.USER_URL.concat("/", userId),
        user,
        common.METHOD_PUT
      );
    }
    return fetch.doPostRequest(dumApi.USER_CREATE_URL, user);
  },
};
