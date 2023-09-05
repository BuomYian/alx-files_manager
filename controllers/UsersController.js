import sha1 from 'sha1';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const userExists = await dbClient.db.collection('users').findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashedPassword = sha1(password);

    const newUser = {
      email,
      password: hashedPassword,
    };

    const result = await dbClient.db.collection('users').insertOne(newUser);

    const createdUser = {
      id: result.insertedId,
      email,
    };

    return res.status(201).json(createdUser);
  }

  static async getMe(req, res) {
    const { 'x-token': token } = req.headers;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const key = `auth_${token}`;
    const userJson = await redisClient.get(key);

    if (!userJson) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { email, id } = JSON.parse(userJson);

    return res.status(200).json({ email, id });
  }
}

export default UsersController;
