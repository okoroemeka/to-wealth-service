import express from 'express';
import Budget from '../controllers/Budget';
import Validation from '../middlewares/Validation';
import VerifyUser from '../helpers/token';

const budgetRouter = express.Router();

budgetRouter.post(
  '/budget',
  VerifyUser.verifyToken,
  Validation.createBudgetValidation,
  Budget.createBudget
);

export default budgetRouter;
