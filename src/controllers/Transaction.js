import models from "../db/models";
import { response as responseHelper, queryHelper } from "../helpers";

const { Transaction: TransactionModel, Account } = models;

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

      const account = await Account.findOne({where: {userId: id, name: "cashAccount"}});
      if(type === "income"){
        const newBalance = account.balance + amount;
        await queryHelper.update(Account, {balance: newBalance}, {id: account.id});
      } else if (type === "expense"){
        const newBalance = account.balance - amount;
        await queryHelper.update(Account, {balance: newBalance}, {id: account.id});
      }

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
      const transaction = await TransactionModel.findOne({
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

  static async getAllTransactions(request, response) {
    const {
      userData: { id: userId }
    } = request;

    try {
      const transactions = await TransactionModel.findAll({
        where: { userId },
        include: ["transactionCategory"],
      });

      return responseHelper(response, 200, "Success", transactions, true);
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

  static async getTransactionsByType(request, response) {
    const {
      userData: { id: userId },
      query: {type}
    } = request;

    try {
      const transactions = await TransactionModel.findAll({
        where: { userId, type },
        include: ["transactionCategory"],
      });

      return responseHelper(response, 200, "Success", transactions, true);
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

  static async getTransactionsByCategory(request, response) {
    const {
      userData: { id: userId },
      query: {categoryId}
    } = request;

    try {
      const transactions = await TransactionModel.findAll({
        where: { userId, categoryId },
        include: ["transactionCategory"],
      });

      return responseHelper(response, 200, "Success", transactions, true);
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
