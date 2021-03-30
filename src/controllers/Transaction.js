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
  /**
   * Method to Update Transaction
   * @param {object} request
   * @param {object} response
   * @returns {object}
   */
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

  static async deleteTransaction(request, response) {
    const {
      userData: { id: userId },
      params: { id },
    } = request;

    try {
      const transaction = await queryHelper.findOne(TransactionModel, {
        id,
        userId,
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

      await TransactionModel.destroy({
        where: { id },
      });

      return responseHelper(
        response,
        200,
        "Success",
        "Transaction Deleted",
        true
      );
    } catch (error) {
      return responseHelper(
        response,
        500,
        "Error",
        "Something went wrong",
        false
      );
    }
  }

  static async getTransaction(request, response) {
    const {
      userData: { id: userId },
      params: { id },
    } = request;

    try {
      const transaction = TransactionModel.findOne({
        where: { id, userId },
        include: ["transactionCategory"],
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

      return responseHelper(response, 200, "Success", transaction, true);
    } catch (error) {
      console.log(error);
      return responseHelper(
        response,
        500,
        "Error",
        "Something went wrong",
        false
      );
    }
  }
}

export default Transaction;
