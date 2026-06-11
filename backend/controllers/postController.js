const Post = require("../models/Post");
const cloudinary =
  require("../config/cloudinary");

const createPost = async (
  req,
  res
) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const result =
        await new Promise(
          (resolve, reject) => {
            cloudinary.uploader
              .upload_stream(
                {
                  folder:
                    "social-posts"
                },
                (
                  error,
                  result
                ) => {
                  if (error)
                    reject(error);

                  resolve(result);
                }
              )
              .end(req.file.buffer);
          }
        );

      imageUrl =
        result.secure_url;
    }

    const post =
      await Post.create({
        user: req.user._id,
        text: req.body.text,
        image: imageUrl
      });

    const populatedPost =
      await Post.findById(
        post._id
      ).populate(
        "user",
        "username"
      );

    res.status(201).json({
      success: true,
      post: populatedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message
    });
  }
};

const getPosts = async (
  req,
  res
) => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit = 5;

    const posts = await Post.find()
      .populate("user", "username email")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      posts
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const likePost = async (
  req,
  res
) => {
  try {
    const post =
      await Post.findById(
        req.params.id
      );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    const alreadyLiked =
      post.likes.find(
        (like) =>
          like.userId.toString() ===
          req.user._id.toString()
      );

    if (alreadyLiked) {
      post.likes =
        post.likes.filter(
          (like) =>
            like.userId.toString() !==
            req.user._id.toString()
        );
    } else {
      post.likes.push({
        userId: req.user._id,
        username:
          req.user.username
      });
    }

    await post.save();

    const populatedPost = await Post.findById(post._id).populate(
      "user",
      "username"
    );

    res.json({
      success: true,
      post: populatedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const addComment = async (
  req,
  res
) => {
  try {
    const { comment } = req.body;

    const post =
      await Post.findById(
        req.params.id
      );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found"
      });
    }

    post.comments.push({
      userId: req.user._id,
      username:
        req.user.username,
      comment
    });

    await post.save();

    const populatedPost = await Post.findById(post._id).populate(
      "user",
      "username"
    );

    res.json({
      success: true,
      post: populatedPost
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createPost,
  getPosts,
  likePost,
  addComment
};