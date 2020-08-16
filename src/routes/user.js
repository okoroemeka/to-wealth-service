import express from 'express';
import SignUp from '../controllers/SignUp';
import SignIn from '../controllers/SignIn';
import AuthValidation from '../middlewares/authValidation';

const userRouter = express.Router();
userRouter.post('/auth/signup', AuthValidation.signupValidation, SignUp);
userRouter.post('/auth/login', AuthValidation.signInValidation, SignIn);

export default userRouter;
