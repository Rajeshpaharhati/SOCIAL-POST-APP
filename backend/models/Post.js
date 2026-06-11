const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    text: {
      type: String,
      default: ""
    },

    image: {
      type: String,
      default: ""
    },

    likes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId
        },

        username: String
      }
    ],

    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId
        },

        username: String,

        comment: String,

        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Post",
  postSchema
);