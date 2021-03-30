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
        categoryId, budget, description
      }, userData
    } = request;
    try {
      const newBudget = await BudgetModel.create({
        categoryId, budget, description, userId: userData.id
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
      const budget = await BudgetModel.findOne({where: { id: budgetId, userId: userData.id }, include: ['budgetsCategory']});

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
 *
 * @returns {object} response
 * @param {object} request
 * @param {object} response
 */
  static async getAllBudget(request, response) {
    try {
      const { userData: { id } } = request;
      const budgets = await BudgetModel.findAll({where: { userId: id }, attributes: ['categoryId', 'description', 'budget', 'userId'], include: ['budgetsCategory']});

      if (!budgets.length) {
        return responseHelper(response, 404, 'Fail', 'No budget found', false);
      }

      return responseHelper(response, 200, 'Success', budgets, true);
    } catch (error) {
      console.log(error);
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
   * @returns {object} budget
   * @param {object} request
   * @param {object} response
   */
  static async updateBudget(request, response) {
    try {
      const {
        userData: { id }, params: { budgetId }, body: {
          categoryId, budget, description
        }
      } = request;

      const checkBudget = await queryHelper.findOne(BudgetModel, { id: budgetId, userId: id });

      if (!checkBudget) {
        return responseHelper(response, 404, 'Fail', 'Budget does not exist', false);
      }

      const updatedBudget = await queryHelper.update(BudgetModel, {
        categoryId, budget, description
      }, { id: budgetId }, true);

      return responseHelper(response, 200, 'Sucess', updatedBudget[1][0], true);
    } catch (error) {
      console.log(error);
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
   * @returns {object} response message
   * @param {*} request
   * @param {*} response
   */
  static async deleteBudget(request, response) {
    try {
      const { params: { budgetId }, userData: { id } } = request;
      const budget = await queryHelper.findOne(BudgetModel, { id: budgetId, userId: id });

      if (!budget) {
        return responseHelper(response, 404, 'Fail', 'budget does not exist', false);
      }

      await BudgetModel.destroy({
        where: {
          id: budgetId
        }
      });

      return responseHelper(response, 204, 'Success', 'budget deleted successfully');
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
