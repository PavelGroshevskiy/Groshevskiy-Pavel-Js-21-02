const moment = require("moment");

class objUtils {
  reduceKeys(entity, allowed = []) {
    return Object.keys(entity)
      .filter((key) => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = entity[key];
        return obj;
      }, {});
  }
  dateTimeSplitter(obj, keys = []) {
    return Object.keys(obj).reduce(function (result, key) {
      result[key] = keys.includes(key)
        ? {
            date: moment(obj[key]).format("YYYY-MM-DD"),
            time: moment(obj[key]).format("HH:MM"),
          }
        : obj[key];
      return result;
    }, {});
  }
  arrayReduceKeys(arr, allowed) {
    return arr.map((value) => this.reduceKeys(value, allowed));
  }
  arrayTimeSplitter(arr, keys = []) {
    return arr.map((value) => this.dateTimeSplitter(value, keys));
  }
  KeysInObj(obj, keys) {
    return keys.filter((key) => !obj.hasOwnProperty(key));
  }
}

module.exports = new objUtils();
