import express from 'express';
import { loginController, registerController, meController } from '../controllers/UserController.js';
import checkAuth from '../utils/checkAuth.js';
import { registerValidation } from '../validations/auth.js';
const router = express.Router();
router.post('/login', loginController);
router.post('/register', registerValidation, registerController);
router.get('/me', checkAuth, meController);
export default router;
//# sourceMappingURL=authRoutes.js.map