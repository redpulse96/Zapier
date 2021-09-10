'use strict';

// Importing packages
const { Router } = require('express');
const router = Router();

// Importing Middlewares
const { protect } = require('../middlewares');

// Importing handlers
const { addCommentHandler } = require('../handlers');

router.post('/:_id', protect, addCommentHandler);

module.exports = router;
