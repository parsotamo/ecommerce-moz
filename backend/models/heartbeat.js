const redisClient = require("./redis");

exports.getUsersInfoState = (key, cb) => {
  redisClient.HGETALL(key, (err, res) => {
    cb(err, res);
  });
};

exports.getUserInfoState = (key, subKey, cb) => {
  redisClient.HGET(key, subKey, (err, res) => {
    cb(err, res);
  });
};

exports.addUsersToListRedis = (key, subKey, value, cb) => {
  redisClient.HMSET(key, subKey, JSON.stringify(value), (err, res) => {
    return cb(err, res);
  });
};

exports.removeUsersFromListRedis = (key, subKey) => {
  redisClient.HDEL(key, subKey);
};
exports.removeAllUsersFromListRedis = (key, cb) => {
  redisClient.HGETALL(key, (err, res) => {
    if (res) {
      Object.keys(res).forEach((user_id) => {
        redisClient.HDEL(key, user_id);
      });
    }
    cb(err, res);
  });
};
