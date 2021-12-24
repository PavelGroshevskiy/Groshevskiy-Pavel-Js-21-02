const dumApi = require("../constants/dumMyApi");
const common = require("../constants/common");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

module.exports = {
  doGetRequest: (path, searchParams) => {
    const url = new URL(path, dumApi.BASE_URL);
    searchParams &&
      Object.entries(searchParams).forEach((params) => {
        url.searchParams.append(
          params[0],
          (params[1] && params[1].toString()) || ""
        );
      });
    return fetch(url.toString(), {
      method: common.METHOD_GET,
      headers: {
        [dumApi.APP_ID_FIELD]: dumApi.APP_ID_VALUE,
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  },
  doPostRequest: (path, formParams, method = common.METHOD_POST) => {
    const url = new URL(path, dumApi.BASE_URL);
    return fetch(url.toString(), {
      method,
      headers: {
        [dumApi.APP_ID_FIELD]: dumApi.APP_ID_VALUE,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formParams),
    }).then((resp) => resp.json());
  },
};
