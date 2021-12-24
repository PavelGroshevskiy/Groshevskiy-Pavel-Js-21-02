const logger = require("../logger");
const format = require("string-format");
const { userRepository: messages } = require("../constants/loggerMessages");
const userApi = require("../api/userApi");
const imgDBApi = require("../api/imgBBApi");

const userMapper = require("../mappers/userMapper");
const postMapper = require("../mappers/postMapper");
const imgMapper = require("../mappers/imgMapper");

class postRepository {
  get(id) {
    logger.info(format(messages.GET_THIRD_PARTY_INVOKE, JSON.stringify(id)));
    return userApi
      .get(id)
      .then((postResp) => {
        logger.info(
          format(
            messages.GET_THIRD_PARTY_REPLY_SUCCESS,
            JSON.stringify(postResp)
          )
        );
        const result = userMapper.baseInfo(postResp);
        logger.info(
          format(messages.GET_THIRD_PARTY_REPLY_RESULT, JSON.stringify(result))
        );
        return result;
      })
      .catch((error) => {
        logger.error(
          format(messages.GET_THIRD_PARTY_REPLY_ERROR, JSON.stringify(error))
        );
        return Promise.reject(userMapper.baseInfo(error)); // Скроем ошибку от пользователя и добавим дату
      });
  }

  list(page, limit) {
    logger.info(format(messages.LIST_THIRD_PARTY_INVOKE, page, limit));
    return userApi
      .getUserList(page, limit)
      .then((postResp) => {
        logger.info(
          format(
            messages.LIST_THIRD_PARTY_REPLY_SUCCESS,
            page,
            limit,
            JSON.stringify(postResp)
          )
        );
        const result = userMapper.listPreview(postResp);
        logger.info(
          format(messages.LIST_THIRD_PARTY_REPLY_RESULT, JSON.stringify(result))
        );
        return result;
      })
      .catch((error) => {
        logger.error(
          format(messages.LIST_THIRD_PARTY_REPLY_ERROR, JSON.stringify(error))
        );
        return Promise.reject(userMapper.baseInfo(error)); // Скроем ошибку от пользователя и добавим дату
      });
  }
  listPosts(userId, page, limit) {
    logger.info(
      format(messages.LIST_POSTS_THIRD_PARTY_INVOKE, userId, page, limit)
    );
    return userApi
      .getPostListByUser(userId, page, limit)
      .then((postResp) => {
        logger.info(
          format(
            messages.LIST_POSTS_THIRD_PARTY_REPLY_SUCCESS,
            JSON.stringify(postResp)
          )
        );
        const result = postMapper.listBaseInfo(postResp);
        logger.info(
          format(
            messages.LIST_POSTS_THIRD_PARTY_REPLY_RESULT,
            JSON.stringify(result)
          )
        );
        return result;
      })
      .catch((error) => {
        logger.error(
          format(
            messages.LIST_POSTS_THIRD_PARTY_REPLY_ERROR,
            JSON.stringify(error)
          )
        );
        return Promise.reject(postMapper.listBaseInfo(error)); // Скроем ошибку от пользователя и добавим дату
      });
  }

  update(userId, user) {
    logger.info(
      format(messages.UPDATE_THIRD_PARTY_INVOKE, userId, JSON.stringify(user))
    );
    if (!userId) {
      const required = userMapper.checkRequired(user);
      if (required.length > 0) {
        return Promise.reject(
          userMapper.baseInfo({
            error: "error",
            required: required,
          })
        );
      }
    }
    return userApi
      .updateUser(userId, user)
      .then((userResp) => {
        logger.info(
          format(
            messages.UPDATE_THIRD_PARTY_REPLY_SUCCESS,
            JSON.stringify(userResp)
          )
        );
        const result = userMapper.baseInfo(userResp);
        logger.info(
          format(
            messages.UPDATE_THIRD_PARTY_REPLY_RESULT,
            JSON.stringify(result)
          )
        );
        return result;
      })
      .catch((error) => {
        logger.error(
          format(messages.UPDATE_THIRD_PARTY_REPLY_ERROR, JSON.stringify(error))
        );
        return Promise.reject(userMapper.baseInfo(error)); // Скроем ошибку от пользователя и добавим дату
      });
  }

  uploadAvatar(file) {
    logger.info(
      format(messages.UPLOAD_AVATAR_THIRD_PARTY_INVOKE, file.originalname)
    );
    return imgDBApi
      .uploadImg(file)
      .then((avtResp) => {
        logger.info(
          format(
            messages.UPLOAD_AVATAR_THIRD_PARTY_REPLY_SUCCESS,
            JSON.stringify(avtResp)
          )
        );
        if (avtResp.success === true) {
          const result = imgMapper.urlInfo(avtResp.data);
          logger.info(
            format(
              messages.UPLOAD_AVATAR_THIRD_PARTY_REPLY_RESULT,
              JSON.stringify(result)
            )
          );
          return result;
        } else {
          return Promise.reject({ error: "error" });
        }
      })
      .catch((error) => {
        logger.error(
          format(
            messages.UPLOAD_AVATAR_THIRD_PARTY_REPLY_ERROR,
            JSON.stringify(error)
          )
        );
        return Promise.reject(imgMapper.urlInfo(error)); // Скроем ошибку от пользователя и добавим дату
      });
  }
}

module.exports = new postRepository();
