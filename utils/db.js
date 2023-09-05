const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const {
      DB_HOST = 'localhost',
      DB_PORT = 27017,
      DB_DATABASE = 'files_manager',
    } = process.env;

    this.host = DB_HOST;
    this.port = DB_PORT;
    this.database = DB_DATABASE;

    this.client = new MongoClient(`mongodb://${this.host}:${this.port}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.client
      .connect()
      .then(() => console.log('DB connected'))
      .catch((err) => console.error('DB connection error:', err));
  }

  isAlive() {
    return !!this.client && this.client.isConnected();
  }

  async nbUsers() {
    const usersCollection = this.client.db(this.database).collection('users');
    const count = await usersCollection.countDocuments();
    return count;
  }

  async nbFiles() {
    const filesCollection = this.client.db(this.database).collection('files');
    const count = await filesCollection.countDocuments();
    return count;
  }
}

const dbClient = new DBClient();

module.export = dbClient;
