const express = require("express");
const upload =
  require("../middleware/uploadMiddleware");

const {
  createPost,
  getPosts,
  likePost,
  addComment
} = require(
  "../controllers/postController"
);

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.get(
  "/",
  getPosts
);

router.post(
  "/",
  protect,
  upload.single("image"),
  createPost
);
router.post(
  "/:id/like",
  protect,
  likePost
);

router.post(
  "/:id/comment",
  protect,
  addComment
);

module.exports = router;