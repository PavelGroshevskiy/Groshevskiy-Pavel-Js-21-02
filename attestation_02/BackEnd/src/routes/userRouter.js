const router = require("express").Router();
const userService = require("../services/userService");

router.get("/:id", userService.getById);
router.get("/:page/:limit", userService.getList);
router.get("/:id/post/:page/:limit", userService.getPostList);

router.post("/", userService.update);
router.put("/:id", userService.update);
router.put("/:id/avatar", userService.updateAvatar);

module.exports = router;
