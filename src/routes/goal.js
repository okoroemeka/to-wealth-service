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
goalRouter.get(
  '/goal/:goalId',
  //   Validation.goalValidation,
  VerifyUser.verifyToken,
  Goals.getGoal
);
goalRouter.patch(
  '/goal/pauseOrContinue/:goalId',
  //   Validation.goalValidation,
  VerifyUser.verifyToken,
  Goals.pauseOrContinueGoal
);
goalRouter.patch(
  '/goal/completeGoal/:goalId',
  //   Validation.goalValidation,
  VerifyUser.verifyToken,
  Goals.markGoalAscomplete
);
goalRouter.delete(
  '/goal/:goalId',
  //   Validation.goalValidation,
  VerifyUser.verifyToken,
  Goals.deleteGoal
);
goalRouter.get('/goal', VerifyUser.verifyToken, Goals.getAllGoal);
export default goalRouter;
