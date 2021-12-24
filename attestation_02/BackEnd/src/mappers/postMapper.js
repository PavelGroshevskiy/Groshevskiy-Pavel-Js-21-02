const objUtils = require("../utils/objUtils");
const reducers = require("../constants/reducers");

class PostMapper {
  baseInfo(response) {
    return {
      status: response.error ? "error" : "ok",
      ...objUtils.reduceKeys(
        objUtils.dateTimeSplitter(response, reducers.postDates),
        reducers.post
      ),
    };
  }
  listBaseInfo(response) {
    return {
      status: response.error ? "error" : "ok",
      ...objUtils.reduceKeys(response, reducers.page),
      data: objUtils.arrayReduceKeys(
        objUtils.arrayTimeSplitter(response.data, reducers.postDates),
        reducers.post
      ),
    };
  }
}

module.exports = new PostMapper();
