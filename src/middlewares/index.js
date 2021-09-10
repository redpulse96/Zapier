const passport = require('passport');

require('./facebook.strategy')(passport);

module.exports = {
  ...require('./protect'),
  errorHandler: require('./errorHandler'),
  validateRequest: require('./validator'),
};
