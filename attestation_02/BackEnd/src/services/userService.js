const userRepository = require("../repositories/userRepository");

const logger = require("../logger");
const format = require("string-format");
const { userService: messages } = require("../constants/loggerMessages");

class userService {
  getById(req, res) {
    logger.info(format(messages.GET_BY_ID_PARAMS, JSON.stringify(req.params)));
    userRepository
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
    logger.info(format(messages.GET_LIST_PARAMS, JSON.stringify(req.params)));
    userRepository
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

  getPostList(req, res) {
    logger.info(
      format(
        messages.GET_POST_PARAMS_PARAMS,
        req.params.id,
        req.params.page,
        req.params.limit
      )
    );

    userRepository
      .listPosts(req.params.id, req.params.page, req.params.limit)
      .then((response) => {
        const result = JSON.stringify(response);
        logger.info(format(messages.GET_POST_SUCCESS, 200, result));
        res.status(200).send(result);
      })
      .catch((error) => {
        logger.error(format(messages.GET_POST_ERROR, 520, error));
        res.status(520).json(error);
      });
  }

  update(req, res) {
    logger.info(
      format(messages.UPDATE_PARAMS, req.params.id, JSON.stringify(req.body))
    );
    userRepository
      .update(req.params.id, req.body)
      .then((response) => {
        const result = JSON.stringify(response);
        logger.info(format(messages.UPDATE_SUCCESS, 200, result));
        res.status(200).send(result);
      })
      .catch((error) => {
        logger.error(format(messages.UPDATE_ERROR, 520, error));
        res.status(520).json(error);
      });
  }

  updateAvatar(req, res) {
    logger.info(
      format(
        messages.UPDATE_AVATAR_PARAMS,
        req.params.id,
        req.file.originalname
      )
    );
    userRepository
      .uploadAvatar(req.file)
      .then((response) => {
        logger.info(
          format(
            messages.UPDATE_PARAMS,
            req.params.id,
            JSON.stringify({ picture: response.url })
          )
        );
        userRepository
          .update(req.params.id, { picture: response.url })
          .then((response) => {
            const result = JSON.stringify(response);
            logger.info(format(messages.UPDATE_SUCCESS, 200, result));
            res.status(200).send(result);
          })
          .catch((error) => {
            logger.error(format(messages.UPDATE_ERROR, 520, error));
            res.status(520).json(error);
          });
      })
      .catch((error) => {
        logger.error(format(messages.UPDATE_AVATAR_ERROR, 520, error));
        res.status(520).json(error);
      });
  }
}

module.exports = new userService();
