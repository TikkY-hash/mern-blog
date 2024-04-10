import express from 'express';
import { loginController, registerController } from '../controllers/UserController.js';
import { registerValidation } from '../validations/auth.js';

const router = express.Router();

router.post('/login', loginController);

router.post('/register', registerValidation, registerController);

export default router;
