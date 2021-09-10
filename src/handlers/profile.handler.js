'use strict';

// Importing the model
const { Profile } = require('../models');

// Importing utils
const { AppError, catchAsync } = require('../utils');

// Handler function to Create a profile
const createHandler = catchAsync(async (req, res, next) => {
  const {
    body: { role, summary },
    user: { _id, username },
  } = req;

  const existingProfile = await Profile.findOne({ userId: _id });
  if (existingProfile) {
    const updateProfile = {
      userId: _id,
      username: username,
      role: role,
      summary: summary,
    };
    await Profile.updateOne({ _id: existingProfile.toJSON()._id }, updateProfile);
    console.log('----------| updateProfile |----------');

    res.status(200).json({
      status: 'success',
      data: { ...updateProfile },
    });
  } else {
    const createProfile = new Profile();
    createProfile.userId = _id;
    createProfile.username = username;
    createProfile.role = role;
    createProfile.summary = summary;
    await createProfile.save();
    console.log('----------| createProfile |----------');

    res.status(200).json({
      status: 'success',
      data: { ...createProfile.toJSON() },
    });
  }
});

const readHandler = catchAsync(async (req, res, next) => {
  const {
    params: { _id },
    query: { username },
  } = req;

  const $or = [{ _id }, { username }];
  const userProfile = await Profile.findOne({ $or });
  if (!userProfile) return next(new AppError('User profile not created', 400));

  res.status(200).json({
    success: true,
    result: { ...userProfile.toJSON() },
  });
});

const updateHandler = catchAsync(async (req, res, next) => {
  const {
    body,
    user: { _id: userId },
  } = req;

  const userProfile = await Profile.findOne({ userId });
  if (!userProfile) return next(new AppError('User profile does not exist', 400));

  console.log('----------| userProfile |----------');

  const { _id } = userProfile.toJSON();
  const updatedSummary = {
    summary: {
      ...userProfile.toJSON().summary,
      ...body,
    },
  };

  await Profile.updateOne({ _id }, updatedSummary);

  res.status(200).json({
    success: true,
    result: updatedSummary,
  });
});

const deleteHandler = catchAsync(async (req, res, next) => {
  const {
    user: { _id: userId },
  } = req;

  const deletedProfile = await Profile.findOneAndDelete({ userId });
  if (!deletedProfile) return next(new AppError('User profile does not exist', 400));

  console.log('----------| deletedProfile |----------');

  res.status(200).json({
    success: true,
    result: { ...deletedProfile.toJSON() },
  });
});

module.exports = {
  createHandler,
  readHandler,
  updateHandler,
  deleteHandler,
};
