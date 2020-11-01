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
      body: {
        category, budget, description, actual
      }, userData
    } = request;
    try {
      const newBudget = await BudgetModel.create({
        category, budget, description, actual, userId: userData.id
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

  /**
     * @returns {object} responsr
     * @param {object} request
     * @param {object} response
     */
  static async getBudget(request, response) {
    try {
      const { budgetId } = request.params;
      const { userData } = request;
      const budget = await queryHelper.findOne(BudgetModel, { id: budgetId, userId: userData.id });

      if (!budget) {
        return responseHelper(response, 404, 'Fail', 'Budget does not exist', false);
      }

      return responseHelper(response, 200, 'Success', budget, true);
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

  /**
 *  @returns {object} response
 * @param {object} request
 * @param {object} response
 */
  static async getAllBudget(request, response) {
    try {
      const { userData: { id } } = request;
      const budgets = await queryHelper.findAll(BudgetModel, { userId: id }, ['category', 'description', 'budget', 'actual', 'userId']);

      if (!budgets.length) {
        return responseHelper(response, 404, 'Fail', 'No budget found', false);
      }

      return responseHelper(response, 200, 'Success', budgets, true);
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
