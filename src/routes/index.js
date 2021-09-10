'use strict';

// Importing packages
import express from 'express';
import usersRouter from './users.js';
const router = express.Router();

router.use('/user', usersRouter);

export default router;
