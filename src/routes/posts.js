'use strict';

// Importing packages
const { Router } = require('express');
const router = Router();

// Importing Middlewares
const { protect } = require('../middlewares');

// Importing handlers
const { createPostHandler, likePostHandler, fetchPostHandler } = require('../handlers');

router.post('/', protect, createPostHandler);
router.put('/:_id', protect, likePostHandler);
router.get('/:_id', protect, fetchPostHandler);

module.exports = router;
