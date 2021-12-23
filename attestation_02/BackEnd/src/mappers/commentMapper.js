const objUtils = require("../utils/objUtils");
const reducers = require("../constants/reducers");

class CommentMapper {
  listBaseInfo(response) {
    return {
      ...objUtils.reduceKeys(response, reducers.page),
      data: objUtils.arrayReduceKeys(
        objUtils.arrayTimeSplitter(response.data, reducers.commentDates),
        reducers.comment
      ),
      status: response.error ? "error" : "ok",
    };
  }
}

module.exports = new CommentMapper();
