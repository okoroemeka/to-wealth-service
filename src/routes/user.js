import express from 'express';
import SignUp from '../controllers/SignUp';
import SignIn from '../controllers/SignIn';
import User from '../controllers/User';
import UpdateProfile from '../controllers/UpdateProfile';
import UpdatePassword from '../controllers/UpdatePassword';

import AuthValidation from '../middlewares/authValidation';
import VerifyUser from '../helpers/token';

const userRouter = express.Router();
userRouter.post('/auth/signup', AuthValidation.signupValidation, SignUp);
userRouter.post('/auth/login', AuthValidation.signInValidation, SignIn);
userRouter.get('/auth/user', VerifyUser.verifyToken, User);
userRouter.patch('/user/profile', VerifyUser.verifyToken, AuthValidation.updateProfileValidation, UpdateProfile);
userRouter.patch('/user/passwordUpdate', VerifyUser.verifyToken, AuthValidation.updatePasswordValidation, UpdatePassword);

export default userRouter;
