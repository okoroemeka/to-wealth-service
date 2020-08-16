import express from 'express';
import SignUp from '../controllers/SignUp';
// import validation from '../middlewares/signupValidationMiddleware';

const userRouter = express.Router();
userRouter.post('/auth/signup', SignUp);
console.log('url', 'userRouter');
// userRouter.post('/auth/login', validation.signInValidation, User.login);

export default userRouter;
