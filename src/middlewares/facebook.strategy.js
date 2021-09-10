'use strict';

// Import packages
const FacebookStrategy = require('passport-facebook').Strategy;

// Import App details and Models
const { FACEBOOK_APP_ID: clientID, FACEBOOK_APP_SECRET: clientSecret } = process.env;

module.exports = (passport) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID,
        clientSecret,
        callbackURL: '/return',
        passReqToCallback: true,
      },
      (req, token, tokenSecret, profile, cb) => {
        // In this example, the user's Facebook profile is supplied as the user
        // record.  In a production-quality application, the Facebook profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        console.log('----------| facebook.profile |----------');
        console.log(token, tokenSecret, profile);
        req.profile = profile._json;
        req.token = token;
        req.tokenSecret = tokenSecret;
        return cb(null, profile);
      },
    ),
  );
};
