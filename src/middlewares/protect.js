'use strict';

// Import packages
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

// Import modules
const { AppError, catchAsync } = require('../utils');
const { Users } = require('../models');

const protect = catchAsync(async (req, res, next) => {
  let token;
  // Check if there's a token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  console.log(req.headers);
  if (!token) return next(new AppError('Please log in', 401));

  // Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  console.log(decoded);
  // Check if the user available
  const user = await Users.findById(decoded._id).populate('branchId');
  if (!user) {
    return next(new AppError('User belongs to this token is not available', 401));
  }

  // Grant access
  req.user = user.toJSON();
  next();
});

module.exports = { protect };
