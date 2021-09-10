'use strict';

// Importing packages
import express from 'express';
// const Router =  express.Router();
// Importing handlers
import { UsersHandler } from '../handlers/index.js';
// Importing Middlewares
import { protect } from '../middlewares/index.js';

const { attachbranch, getSingleUser, login, logout, signup, update } = UsersHandler;

const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(signup);
router.route('/logout').post(logout);
router.route('/update').post(protect, update);
router.route('/fetch').get(protect, getSingleUser);
router.route('/attachbranch/:branchId').put(protect, attachbranch);

export default router;
