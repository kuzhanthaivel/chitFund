import router from 'express';
import { signUpController } from '../controllers/auth/signUpController';
import { loginController } from '../controllers/auth/loginController';
import { verifyToken } from '../controllers/middlewares/verifyToken';
import { userDataController } from '../controllers/auth/userDataController';

const authRoutes = router();

authRoutes.post('/signup', signUpController);
authRoutes.post('/login', loginController);
authRoutes.get('/userData', verifyToken, userDataController);
export default authRoutes;