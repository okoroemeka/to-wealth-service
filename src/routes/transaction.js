import express from "express";
import Transaction from "../controllers/Transaction";
import Validation from "../middlewares/Validation";
import VerifyUser from "../helpers/token";

const transactionRouter = express.Router();

transactionRouter.post(
  "/transaction",
  VerifyUser.verifyToken,
  Validation.createTransactionValidation,
  Transaction.createTransaction
);

export default transactionRouter;
