'use strict';

// Importing mongoose and Schema
const { Schema, model } = require('mongoose');

// Creating a schema
const branchSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

branchSchema.virtual('branches', {
  ref: 'branches',
  localField: '_id',
  foreignField: 'branchId',
});

// Creating model from a Schema
const Branches = model('branches', branchSchema);

module.exports = Branches;
