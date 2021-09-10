'use strict';

// Importing the model
const { Post } = require('../models');

// Importing utils
const { AppError, catchAsync } = require('../utils');

// Handler function to Create a profile
const createPostHandler = catchAsync(async (req, res, next) => {
  const {
    body: { post },
    user: { _id: userId },
  } = req;

  const createPost = new Post();
  createPost.body = post;
  createPost.likesCount = 0;
  createPost.commentsCount = 0;
  createPost.likes = [];
  createPost.postedBy = userId;
  await createPost.save();
  console.log('----------| createPost |----------');

  res.status(200).json({
    status: 'success',
    data: { ...createPost.toJSON() },
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
  const posts = await Post.find({ $or }).populate('user');
  if (!posts) return next(new AppError('Post does not exist', 400));

  res.status(200).json({
    success: true,
    result: [...posts],
  });
});

const likePostHandler = catchAsync(async (req, res, next) => {
  const {
    user: { _id: userId },
    params: { _id },
  } = req;

  const existPost = await Post.findOne({ _id });
  if (!existPost) return next(new AppError('Post does not exist', 400));

  console.log('----------| existPost |----------');
  const updatedBranch = {
    $inc: { likesCount: 1 },
    $push: { likes: userId },
  };

  await Post.updateOne({ _id }, updatedBranch);

  res.status(200).json({
    success: true,
    result: updatedBranch,
  });
});

module.exports = {
  createPostHandler,
  fetchPostHandler,
  likePostHandler,
};
