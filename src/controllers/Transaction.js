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
}

export default Transaction;
