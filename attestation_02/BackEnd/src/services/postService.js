const postRepository = require("../repositories/postRepository");
const logger = require("../logger");
const format = require("string-format");
const { postService: messages } = require("../constants/loggerMessages");

class postService {
  getById(req, res) {
    logger.info(format(messages.GET_BY_ID_PARAMS, req.params.id));
    postRepository
      .get(req.params.id)
      .then((response) => {
        const result = JSON.stringify(response);
        logger.info(format(messages.GET_BY_ID_SUCCESS, 200, result));
        res.status(200).send(result);
      })
      .catch((error) => {
        logger.error(format(messages.GET_BY_ID_ERROR, 520, error));
        res.status(520).json(error);
      });
  }

  getList(req, res) {
    logger.info(
      format(messages.GET_LIST_PARAMS, req.params.page, req.params.limit)
    );
    postRepository
      .list(req.params.page, req.params.limit)
      .then((response) => {
        const result = JSON.stringify(response);
        logger.info(format(messages.GET_LIST_SUCCESS, 200, result));
        res.status(200).send(result);
      })
      .catch((error) => {
        logger.error(format(messages.GET_LIST_ERROR, 520, error));
        res.status(520).json(error);
      });
  }

  getPostCommentList(req, res) {
    logger.info(
      format(
        messages.GET_COMMENT_PARAMS,
        req.params.id,
        req.params.page,
        req.params.limit
      )
    );
    postRepository
      .listComments(req.params.id, req.params.page, req.params.limit)
      .then((response) => {
        const result = JSON.stringify(response);
        logger.info(format(messages.GET_COMMENT_SUCCESS, 200, result));
        res.status(200).send(result);
      })
      .catch((error) => {
        logger.error(format(messages.GET_COMMENT_ERROR, 520, error));
        res.status(520).json(error);
      });
  }
}

module.exports = new postService();
