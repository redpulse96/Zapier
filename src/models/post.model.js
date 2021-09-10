'use strict';

// Importing mongoose and Schema
const { Schema, model } = require('mongoose');

// Creating a schema
const postSchema = new Schema(
  {
    body: {
      type: Object,
      required: true,
    },
    likesCount: Number,
    commentsCount: Number,
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
      },
    ],
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

postSchema.virtual('user', {
  ref: 'user',
  localField: '_id',
  foreignField: 'likes',
});
postSchema.virtual('comment', {
  ref: 'comment',
  localField: '_id',
  foreignField: 'commentOn',
});

// Creating model from a Schema
const Post = model('post', postSchema);

module.exports = Post;
