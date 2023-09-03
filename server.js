import express from 'express';

const app = express();
const port = process.env.PORT || 5000; // Use PORT environment variable or default to 5000

// Import routes from the routes/index.js file
const routes = require('./routes');

// Middleware to parse JSON requests
app.use(express.json());

// Use the routes defined in routes/index.js
app.use('/', routes);

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
