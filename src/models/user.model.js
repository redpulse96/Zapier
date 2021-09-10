'use strict';

// Importing mongoose and Schema
import mongoose from 'mongoose';
import validator from 'validator';

const { model, Schema } = mongoose;
const { isEmail } = validator;

// Creating a users schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: isEmail,
        message: 'This is not a valid email',
      },
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
    },
    registered_at: {
      type: Date,
      default: Date.now,
    },
    profileFinished: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'post',
        required: true,
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'post',
        required: true,
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'comment',
        required: true,
      },
    ],
    role: {
      type: String,
      enum: [null, 'employee', 'company', 'admin'],
      default: null,
    },
    branchId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'branches',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

// referencing user profile
userSchema.virtual('profile', {
  ref: 'profile',
  localField: '_id',
  foreignField: 'userId',
});

userSchema.virtual('post', {
  ref: 'post',
  localField: '_id',
  foreignField: 'postedBy',
});

userSchema.virtual('comment', {
  ref: 'comment',
  localField: '_id',
  foreignField: 'commentBy',
});

// Creating model from a Schema
const Users = model('user', userSchema);

export default Users;
