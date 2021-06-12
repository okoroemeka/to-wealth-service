import express from "express";
import NetworthController from "../controllers/Networth";
import Validation from "../middlewares/Validation";
import VerifyUser from "../helpers/token";

const networthRouter = express.Router();

networthRouter.post(
  "/networth",
  VerifyUser.verifyToken,
  Validation.networthValidation,
  NetworthController.createNetworth
);

networthRouter.post(
  "/networth/increase/:id",
  VerifyUser.verifyToken,
  Validation.networthTopupValidation,
  NetworthController.increaseValue
);

networthRouter.post(
  "/networth/decrease/:id",
  VerifyUser.verifyToken,
  Validation.networthTopupValidation,
  NetworthController.decreaseValue
);

networthRouter.get(
  "/networth",
  VerifyUser.verifyToken,
  NetworthController.getNetworths
);

networthRouter.get(
  "/networth/:id",
  VerifyUser.verifyToken,
  NetworthController.getNetworthById
);

export default networthRouter;