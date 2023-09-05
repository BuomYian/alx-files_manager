import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const router = express.Router();

// Define the API endpoints
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.post('/users', UsersController.postNew);
router.get('/conect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisConnect);
router.get('/user/me', UsersController.getMe);

export default router;
