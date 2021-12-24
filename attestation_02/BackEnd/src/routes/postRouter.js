const router = require("express").Router();
const postService = require("../services/postService");

router.get("/:id", postService.getById);
router.get("/:page/:limit", postService.getList);
router.get("/:id/comment/:page/:limit", postService.getPostCommentList);

module.exports = router;
