const objUtils = require("../utils/objUtils");
const reducers = require("../constants/reducers");

class UserMapper {
  baseInfo(response) {
    return {
      status: response.error ? "error" : "ok",
      ...objUtils.reduceKeys(
        objUtils.dateTimeSplitter(response, reducers.userDates),
        reducers.user
      ),
    };
  }
  listPreview(response) {
    return {
      status: response.error ? "error" : "ok",
      ...objUtils.reduceKeys(response, reducers.page),
      data: objUtils.arrayReduceKeys(response.data, reducers.userPreview),
    };
  }
  checkRequired(user) {
    return objUtils.KeysInObj(user, reducers.userRequired);
  }
}

module.exports = new UserMapper();
