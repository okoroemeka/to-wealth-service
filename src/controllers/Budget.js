import models from '../db/models';
import { response as responseHelper, queryHelper } from '../helpers';

const { Budget: BudgetModel } = models;

/**
 * Budget
 */
class Budget {
  /**
     * @returns {object} responsr
     * @param {object} request
     * @param {object} response
     */
  static async createBudget(request, response) {
    const {
      category, budget, description, actual, userData
    } = request.body;
    try {
      const newBudget = await BudgetModel.create({
        category, budget, description, actual, userData
      });

      return responseHelper(response, 201, 'Success', newBudget, true);
    } catch (error) {
      return responseHelper(
        response,
        500,
        'Error',
        'An error occured, please try again later',
        false
      );
    }
  }
}

export default Budget;
