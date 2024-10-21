import express from 'express';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../../../shared/type';
import { userController } from '../users/user.controller';


const router = express.Router();
router.post("/register",AuthController.registerUser)

router.post( '/login',  AuthController.loginUser);

router.post(
    '/refresh-token',
    AuthController.refreshToken
)

router.post(
    '/change-password',
    auth(
    USER_ROLE.SUPER_ADMIN,
       USER_ROLE.ADMIN,
       USER_ROLE.USER,
       USER_ROLE.SELLER
    ),
    AuthController.changePassword
);

router.post(
    '/forgot-password',
    AuthController.forgotPassword
);

router.post(
    '/reset-password',
    AuthController.resetPassword
)

//two factor authentication routes below
router.post('/2fa/setup',AuthController.setup2FA)

//verify 2fa
router.post('/2fa/verify',AuthController.verify2FA)
export const AuthRoutes = router;