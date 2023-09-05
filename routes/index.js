const express = require('express');

const router = express.Router();
const AppController = require('../controllers/AppController');

// Define the /status route
router.get('/status', AppController.getStatus);

// Define the /stats route
router.get('/stats', AppController.getStats);

module.exports = router;
