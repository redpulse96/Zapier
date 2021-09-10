const { Router } = require('express');
const router = Router();

const usersRouter = require('./users');
const profileRouter = require('./profile');
const facebookRouter = require('./facebook');
const branchRouter = require('./branch');
const postRouter = require('./posts');
const commentRouter = require('./comment');

router.use('/user', usersRouter);
router.use('/profile', profileRouter);
router.use('/facebook', facebookRouter);
router.use('/branch', branchRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);

module.exports = router;
