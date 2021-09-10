module.exports = {
  ...require('./users.handler'),
  ...require('./profile.handler'),
  ...require('./branch.handler'),
  ...require('./post.handler'),
  ...require('./comment.handler'),
};
