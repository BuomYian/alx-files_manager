const express = require('express');
const db = require('./utils/db');
const { redisClient, isAlive: isRedisAlive } = require('./utils/redis');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 5000;

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
