import express from 'express';
import AppController from '../controllers/AppController';

const router = express.Router();

// API endpoints
router.get('/status', AppController.getStatus);
router.get('/status', AppController.getStatus);

export default router;
