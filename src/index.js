module.exports = function (config) {
  const user = config.user;
  const resolve = require('twitter-kv');

  const get = function (key, done) {
    resolve(user, key, done);
  };

  return {
    get: get,
  };
};
