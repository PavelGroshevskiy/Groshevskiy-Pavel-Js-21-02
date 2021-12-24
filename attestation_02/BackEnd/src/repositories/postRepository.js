const postApi = require("../api/postApi");
const postMapper = require("../mappers/postMapper");
const commentMapper = require("../mappers/commentMapper");
const logger = require("../logger");
const format = require("string-format");
const { postRepository: messages } = require("../constants/loggerMessages");

/* эта прослойка не нужна мы ничего не меняем но для того что бы повторить модель преподавателя
 и лучеш разобраться и в будущем использовать оставлю
*/

class postRepository {
  get(id) {
    logger.info(format(messages.GET_THIRD_PARTY_INVOKE, JSON.stringify(id)));
    return postApi
      .get(id)
      .then((postResp) => {
        logger.info(
          format(
            messages.GET_THIRD_PARTY_REPLY_SUCCESS,
            JSON.stringify(postResp)
          )
        );
        const result = postMapper.baseInfo(postResp);
        logger.info(
          format(messages.GET_THIRD_PARTY_REPLY_RESULT, JSON.stringify(result))
        );
        return result;
      })
      .catch((error) => {
        logger.error(
          format(messages.GET_THIRD_PARTY_REPLY_ERROR, JSON.stringify(error))
        );
        return Promise.reject(postMapper.baseInfo(error)); // Скроем ошибку от пользователя и добавим дату
      });
  }
  list(page, limit) {
    logger.info(format(messages.LIST_THIRD_PARTY_INVOKE, page, limit));
    return postApi
      .getPostList(page, limit)
      .then((postResp) => {
        logger.info(
          format(
            messages.LIST_THIRD_PARTY_REPLY_SUCCESS,
            page,
            limit,
            JSON.stringify(postResp)
          )
        );
        const result = postMapper.listBaseInfo(postResp);
        logger.info(
          format(messages.LIST_THIRD_PARTY_REPLY_RESULT, JSON.stringify(result))
        );
        return result;
      })
      .catch((error) => {
        logger.error(
          format(messages.LIST_THIRD_PARTY_REPLY_ERROR, JSON.stringify(error))
        );
        return Promise.reject(postMapper.baseInfo(error)); // Скроем ошибку от пользователя и добавим дату
      });
  }

  listComments(pageId, page, limit) {
    logger.info(
      format(messages.COMMENT_THIRD_PARTY_INVOKE, pageId, page, limit)
    );
    return postApi
      .getPostCommentList(pageId, page, limit)
      .then((commentResp) => {
        logger.info(
          format(
            messages.COMMENT_THIRD_PARTY_REPLY_SUCCESS,
            JSON.stringify(commentResp)
          )
        );
        const result = commentMapper.listBaseInfo(commentResp);
        logger.info(
          format(
            messages.COMMENT_THIRD_PARTY_REPLY_RESULT,
            JSON.stringify(result)
          )
        );
        return result;
      })
      .catch((error) => {
        logger.error(
          format(
            messages.COMMENT_THIRD_PARTY_REPLY_ERROR,
            JSON.stringify(error)
          )
        );
        return Promise.reject(commentMapper.listBaseInfo(commentResp)); // Скроем ошибку от пользователя и добавим дату
      });
  }
}

module.exports = new postRepository();
