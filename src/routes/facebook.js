'use strict';

// Importing packages
const { Router } = require('express');
const passport = require('passport');
const router = Router();

// Importing handlers
router.get('/auth', passport.authenticate('facebook'));
router.get('/auth/callback', passport.authenticate('facebook'), (req, res) => {
  const { token } = req;
  return res.status(200).json({ token, status: 'success' });
});

module.exports = router;
