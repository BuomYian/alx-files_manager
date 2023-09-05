import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static async getStatus(req, res) {
    const redisIsAlive = redisClient.isAlive();
    const dbIsAlive = dbClient.isAlive();

    const status = {
      redis: redisIsAlive,
      db: dbIsAlive,
    };

    return res.status(200).json(status);
  }

  static async getStats(req, res) {
    const nbUsers = await dbClient.nbUsers();
    const nbFiles = await dbClient.nbFiles();

    const stats = {
      users: nbUsers,
      files: nbFiles,
    };

    return res.status(200).json(stats);
  }
}

export default AppController;
