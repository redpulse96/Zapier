'use strict';

// Importing the model
const { Branches } = require('../models');

// Importing utils
const { AppError, catchAsync } = require('../utils');

// Handler function to Create a profile
const createBranchHandler = catchAsync(async (req, res, next) => {
  const {
    body: { name, description },
  } = req;

  const existingBranch = await Branches.findOne({ name });
  if (existingBranch) {
    const updateProfile = { name, description };
    await Branches.updateOne({ _id: existingBranch.toJSON()._id }, updateProfile);
    console.log('----------| updateProfile |----------');

    res.status(200).json({
      status: 'success',
      data: { ...updateProfile },
    });
  } else {
    const createBranch = new Branches();
    createBranch.name = name;
    createBranch.description = description;
    await createBranch.save();
    console.log('----------| createBranch |----------');

    res.status(200).json({
      status: 'success',
      data: { ...createBranch.toJSON() },
    });
  }
});

const readBranchHandler = catchAsync(async (req, res, next) => {
  const {
    params: { _id },
    query: { name },
  } = req;

  const $or = [];
  if (_id) $or.push({ _id });
  if (name) $or.push({ $regex: name, $options: 'i' });
  if (!$or.length) $or.push({});
  const branch = await Branches.find({ $or });
  if (!branch) return next(new AppError('Branch does not exist', 400));

  res.status(200).json({
    success: true,
    result: [...branch],
  });
});

const updateBranchHandler = catchAsync(async (req, res, next) => {
  const {
    body,
    params: { _id },
  } = req;

  const branch = await Branches.findOne({ _id });
  if (!branch) return next(new AppError('Branch does not exist', 400));

  console.log('----------| branch |----------');

  const updatedBranch = { ...body };

  await Branches.updateOne({ _id }, updatedBranch);

  res.status(200).json({
    success: true,
    result: updatedBranch,
  });
});

const deleteBranchHandler = catchAsync(async (req, res, next) => {
  const {
    params: { _id },
  } = req;

  const deletedBranch = await Branches.findOneAndDelete({ _id });
  if (!deletedBranch) return next(new AppError('User profile does not exist', 400));

  console.log('----------| deletedBranch |----------');

  res.status(200).json({
    success: true,
    result: { ...deletedBranch.toJSON() },
  });
});

module.exports = {
  createBranchHandler,
  readBranchHandler,
  updateBranchHandler,
  deleteBranchHandler,
};
