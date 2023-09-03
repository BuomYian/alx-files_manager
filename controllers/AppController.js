const { isAlive: isRedisAlive } = require('../utils/redis');
const DBClient = require('../utils/db');

const AppController = {
  async getStatus(req, res) {
    const redisIsAlive = isRedisAlive();
    let dbIsAlive;

    try {
      dbIsAlive = await DBClient.isAlive();
    } catch (error) {
      dbIsAlive = false;
    }

    return res.status(200).json({
      redis: redisIsAlive,
      db: dbIsAlive,
    });
  },

  async getStats(req, res) {
    const usersCount = await DBClient.nbUsers();
    const filesCount = await DBClient.nbFiles();

    return res.status(200).json({
      users: usersCount,
      files: filesCount,
    });
  },
};

module.exports = AppController;
