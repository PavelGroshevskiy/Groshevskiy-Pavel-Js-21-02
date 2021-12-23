const objUtils = require("../utils/objUtils");
const reducers = require("../constants/reducers");

class ImgMapper {
  urlInfo(response) {
    return {
      status: response.error ? "error" : "ok",
      ...objUtils.reduceKeys(response, reducers.imgUrl),
    };
  }
}

module.exports = new ImgMapper();
