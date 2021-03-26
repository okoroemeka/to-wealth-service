import express from 'express';
import CategoryController from '../controllers/Category';
import Validation from '../middlewares/Validation';
import VerifyUser from '../helpers/token';
import budgetRouter from './budget';

const categoryRouter = express.Router();

categoryRouter.post(
    '/category',
    VerifyUser.verifyToken,
    CategoryController.createCategory
);

budgetRouter.get(
    '/category',
    VerifyUser.verifyToken,
    CategoryController.getCategories
);

export default categoryRouter;