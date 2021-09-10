'use strict';

// Imports
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./src/routes');
const errorHandler = require('./src/middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const expressMongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const compression = require('compression');
const path = require('path');

// Creating the express app
const app = express();

// Security Middleware
app.use(helmet());

// Body parser
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Cookie parser
app.use(cookieParser());

// Compression Middleware
app.use(compression());

// Parsing JSON, Form-Data and Cookies
app.use(express.urlencoded({ extended: true, limit: '500mb' }));
app.use(cookieParser());

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// Static Directory
app.use('/files', express.static(path.join(__dirname, 'public/storage/files')));

// Sanitizing user data
app.use(expressMongoSanitize());

// Prevent XSS attacks
app.use(xssClean());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Enable CORS option for the following route
const corsOptions = {
  origin: '*',
  methods: 'GET,POST,DELETE,PUT',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// Testing a route
app.get('/', (req, res) => {
  res.send('@2021, WORKZAT All Rights Reserved');
});

// Register the routers
app.use('/api/v1', cors(corsOptions), router);
app.get('/return', passport.authenticate('facebook'), (req, res) => {
  const { token } = req;
  return res.status(200).json({ token, status: 'success' });
});

// catch 404 and forward to error handler
app.use((err, res) => {
  console.error('---Route_not_found---');
  err.status = 'Url Not found!';
  err.statusCode = 404;
  return errorHandler(err, null, res);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  return errorHandler(err, req, res);
});

// Using the errorHandler middleware
app.use(errorHandler);

// Exporting the app
module.exports = app;
