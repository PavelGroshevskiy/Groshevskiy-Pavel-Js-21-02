const router = require("express").Router();
const userRouter = require("./userRouter");
const postRouter = require("./postRouter");

router.use("/post", postRouter);
router.use("/user", userRouter);

module.exports = router;
