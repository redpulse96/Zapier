'use strict';

// Importing packages
const { Router } = require('express');
const router = Router();

// Importing handlers
const {
  createBranchHandler,
  readBranchHandler,
  updateBranchHandler,
  deleteBranchHandler,
} = require('../handlers');

router.post('/', createBranchHandler);
router.get('/', readBranchHandler);
router.put('/:_id', updateBranchHandler);
router.get('/:_id', readBranchHandler);
router.delete('/:_id', deleteBranchHandler);

module.exports = router;
