import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AppController {
  static async getStatus(req, res) {
  // Check if Redis and DB are alive
  const redisStatus = redisClient.isalive();
  const dbStatus = await dbClient.isalive();

  // respond with status
  res.status(200).json({ redis: redisStatus, db: dbStatus });
  }

  static async getStats(req, res) {
    try {
      // Get the number of users and files from the database
      const numUsers = await dbClient.nbUsers();
      const numFiles = await dbClient.nbFiles();

      // Respond with the stats
      res.status(200).json({ users: numUsers, files: numFiles });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default AppController;
