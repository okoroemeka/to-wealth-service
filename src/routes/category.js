import express from 'express';
import CategoryController from '../controllers/Category';
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

budgetRouter.get(
    '/category/type',
    VerifyUser.verifyToken,
    CategoryController.getCategoriesByType
);

export default categoryRouter;