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

transactionRouter.patch(
  "/transaction/:id",
  VerifyUser.verifyToken,
  Validation.createTransactionValidation,
  Transaction.updateTransaction
);

transactionRouter.delete(
  "/transaction/:id",
  VerifyUser.verifyToken,
  Transaction.deleteTransaction
);

transactionRouter.get(
  "/transaction/:id",
  VerifyUser.verifyToken,
  Transaction.getTransaction
);

transactionRouter.get(
  "/transaction/",
  VerifyUser.verifyToken,
  Transaction.getAllTransactions
);

export default transactionRouter;
