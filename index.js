'use strict';

// Configuring the environment variables
import colors from 'colors';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || 'localhost';

// Database Connection
import dbConn from './src/connecter/index.js';
dbConn();

// Importing the express app
import app from './app.js';

// Starting the server
app.listen(PORT, HOST, () => {
  console.log(`Server started on ${HOST}:${PORT}`.brightMagenta);
});

// Handle Unhandled Rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection! Shutting down the server...');
  console.error(err);
  app.close(() => {
    process.exit(1);
  });
});
