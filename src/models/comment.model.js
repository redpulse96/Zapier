'use strict';

// Importing mongoose and Schema
const { Schema, model } = require('mongoose');

// Create a Comments schema
const commentSchema = new Schema(
  {
    commentOn: {
      type: Schema.Types.ObjectId,
      ref: 'post',
      required: true,
    },
    commentBy: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Creating model from a Schema
const Comment = model('comment', commentSchema);

module.exports = Comment;
