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

budgetRouter.get(
  '/budget/:budgetId',
  VerifyUser.verifyToken,
  Budget.getBudget
);

budgetRouter.get(
  '/budget',
  VerifyUser.verifyToken,
  Budget.getAllBudget
);
budgetRouter.patch(
  '/budget/:budgetId',
  VerifyUser.verifyToken,
  Validation.createBudgetValidation,
  Budget.updateBudget
);
budgetRouter.delete(
  '/budget/:budgetId',
  VerifyUser.verifyToken,
  Budget.deleteBudget
);

export default budgetRouter;
