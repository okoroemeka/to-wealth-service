import models from "../db/models";
import { response as responseHelper, queryHelper } from "../helpers";

const { Transaction: TransactionModel } = models;

class Transaction {
  /**
   *
   * @param {object} request
   * @param {object} response
   *
   * @returns {object} response
   */
  static async createTransaction(request, response) {
    const {
      userData: { id },
      body: { categoryId, type, amount, description, date },
    } = request;

    try {
      const newTransaction = await TransactionModel.create({
        type,
        categoryId,
        amount,
        description,
        date,
        userId: id,
      });

      return responseHelper(response, 201, "Success", newTransaction, true);
    } catch (error) {
      return responseHelper(response, 500, "Error", error, false);
    }
  }

  static async updateTransaction(request, response) {
    const {
      userData: { id },
      body: { categoryId, type, amount, description, date },
      params: { id: transactionId },
    } = request;

    try {
      const transaction = await queryHelper.findOne(TransactionModel, {
        id: transactionId,
        userId: id,
      });

      if (!transaction) {
        return responseHelper(
          response,
          404,
          "Error",
          "Transaction not Found",
          false
        );
      }

      const updatedTransaction = await queryHelper.update(
        TransactionModel,
        { categoryId, type, amount, description, date },
        { id: transactionId },
        true
      );

      return responseHelper(
        response,
        200,
        "Success",
        updatedTransaction[1][0],
        true
      );
    } catch (error) {
      return responseHelper(
        response,
        500,
        "Error",
        "An error occured, please try again later",
        false
      );
    }
  }
}

export default Transaction;
