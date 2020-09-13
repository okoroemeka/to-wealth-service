import express from 'express';
import Goals from '../controllers/Goals';
import Validation from '../middlewares/authValidation';
import VerifyUser from '../helpers/token';

const goalRouter = express.Router();

goalRouter.post(
  '/goal',
  // Validation.goalValidation,
  VerifyUser.verifyToken,
  Goals.createGoal
);
goalRouter.patch(
  '/goal/:goalId',
  //   Validation.goalValidation,
  VerifyUser.verifyToken,
  Goals.editGoal
);
export default goalRouter;
