import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class FilesController {
  static async postUpload(req, res) {
    const { 'x-token': token } = req.headers;

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const key = `auth_${token}`;
    const userJson = await redisClient.get(key);

    if (!userJson) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id: userId, email } = JSON.parse(userJson);
    const { name, type, parentId = '0', isPublic = false, data } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Missing name' });
    }

    if (!type || !['folder', 'file', 'image'].includes(type)) {
      return res.status(400).json({ error: 'Missing type' });
    }

    if ((type === 'file' || type === 'image') && !data) {
      return res.status(400).json({ error: 'Missing data' });
    }

    const parent = await dbClient.db
      .collection('files')
      .findOne({ _id: parentId });

    if (parentId !== '0' && (!parent || parent.type !== 'folder')) {
      return res
        .status(400)
        .json({ error: 'Parent not found or not a folder' });
    }

    let localPath = '';

    if (type === 'file' || type === 'image') {
      const folderPath = process.env.FOLDER_PATH || '/tmp/files_manager';
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
      }

      const fileUUID = uuidv4();
      localPath = path.join(folderPath, fileUUID);

      const buffer = Buffer.from(data, 'base64');
      fs.writeFileSync(localPath, buffer);
    }

    const newFile = {
      userId,
      name,
      type,
      isPublic,
      parentId,
      localPath: type === 'file' || type === 'image' ? localPath : null,
    };

    const result = await dbClient.db.collection('files').insertOne(newFile);

    return res.status(201).json({
      id: result.insertedId,
      userId,
      name,
      type,
      isPublic,
      parentId,
    });
  }
}

export default FilesController;
