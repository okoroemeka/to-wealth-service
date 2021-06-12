import express from "express";
import Onboarding from "../controllers/Onboarding";
import VerifyUser from "../helpers/token";

const onboardingRouter = express.Router();

onboardingRouter.get(
  "/onboarding",
  VerifyUser.verifyToken,
  Onboarding.checkOnboarding
);

onboardingRouter.post(
  "/onboarding",
  VerifyUser.verifyToken,
  Onboarding.markOnboarded
);

export default onboardingRouter;