'use strict';

// Importing the model
const { Comment, Post } = require('../models');

// Importing utils
const { AppError, catchAsync } = require('../utils');

// Handler function to Create a profile
const addCommentHandler = catchAsync(async (req, res, next) => {
  const {
    body: { comment },
    user: { _id: commentBy },
    params: { _id: commentOn },
  } = req;

  const postDetails = await Post.findByIdAndUpdate(commentOn, { $inc: { commentsCount: 1 } });
  if (!postDetails) return next(new AppError('Post not found', 400));

  const createComment = new Comment();
  createComment.commentBy = commentBy;
  createComment.body = comment;
  createComment.commentOn = commentOn;
  await createComment.save();
  console.log('----------| createComment |----------');

  res.status(200).json({
    status: 'success',
    data: { ...createComment.toJSON() },
  });
});

const fetchPostHandler = catchAsync(async (req, res, next) => {
  const {
    user: { _id: postedBy },
    params: { _id },
    query: { post },
  } = req;

  const $or = [];
  if (_id) $or.push({ _id });
  if (postedBy) $or.push({ postedBy });
  if (post) $or.push({ $regex: post, $options: 'i' });
  if (!$or.length) $or.push({});
  const posts = await Post.find({ $or });
  if (!posts) return next(new AppError('Post does not exist', 400));

  res.status(200).json({
    success: true,
    result: [...posts],
  });
});

module.exports = {
  addCommentHandler,
  fetchPostHandler,
};
