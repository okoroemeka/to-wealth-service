import express from "express";
import Account from "../controllers/Account";
import VerifyUser from "../helpers/token";

const accountRouter = express.Router();

accountRouter.post(
  "/account/init",
  VerifyUser.verifyToken,
  Account.instanciateAccounts
);

accountRouter.get(
  "/account",
  VerifyUser.verifyToken,
  Account.getAllAccounts
);

accountRouter.get(
  "/account/:accountName",
  VerifyUser.verifyToken,
  Account.getAccount
);

export default accountRouter;
