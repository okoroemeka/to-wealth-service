import express from 'express';
import Goals from '../controllers/Goals';
import Validation from '../middlewares/Validation';
import VerifyUser from '../helpers/token';

const goalRouter = express.Router();

goalRouter.post(
  '/goal',
  VerifyUser.verifyToken,
  Validation.goalValidation,
  Goals.createGoal
);
goalRouter.patch(
  '/goal/:goalId',
  VerifyUser.verifyToken,
  Validation.goalValidation,
  Goals.editGoal
);
goalRouter.get('/goal/:goalId', VerifyUser.verifyToken, Goals.getGoal);
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
goalRouter.patch(
  '/goal/topup/:goalId',
  Validation.topUpValidation,
  VerifyUser.verifyToken,
  Goals.topUPGoal
);
goalRouter.delete('/goal/:goalId', VerifyUser.verifyToken, Goals.deleteGoal);
goalRouter.get('/goal', VerifyUser.verifyToken, Goals.getAllGoal);
export default goalRouter;
