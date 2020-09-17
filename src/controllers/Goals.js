import models from '../db/models';
import { response as responseHelper, queryHelper } from '../helpers';

const { Goal } = models;
/**
 * Goals
 */
class Goals {
  /**
   * @returns {object} response
   * @param {object} request
   * @param {object} response
   */
  static async createGoal(request, response) {
    const {
      body: { goalName, goalValue, totalSaved, timeline, description, color },
      userData,
    } = request;

    try {
      const goal = await Goal.create({
        goalName,
        goalValue: Number(goalValue),
        totalSaved: Number(totalSaved),
        timeline,
        description,
        color,
        userId: userData.id,
        completionRate: (totalSaved / goalValue).toFixed(0),
      });

      return responseHelper(response, 201, 'Success', goal, true);
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
   * @returns {object} response
   * @param {object} request
   * @param {object} response
   */
  static async getAllGoal(request, response) {
    const { userData } = request;
    try {
      const goals = await Goal.findAll({
        where: {
          userId: userData.id,
        },
        attributes: [
          'id',
          'goalName',
          'goalValue',
          'totalSaved',
          'timeline',
          'description',
          'color',
          'completionRate',
          'completed',
          'paused',
        ],
      });
      if (!goals.length) {
        return responseHelper(response, 404, 'Fail', 'No goal found', false);
      }
      return responseHelper(response, 201, 'Success', goals, true);
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
   * @returns {object} response message
   * @param {object} request
   * @param {object} response
   */
  static async editGoal(request, response) {
    const { goalId } = request.params;
    const {
      body: { goalName, goalValue, totalSaved, timeline, description, color },
      userData,
    } = request;

    try {
      const goal = await queryHelper.findOne(Goal, { id: goalId });
      if (!goal) {
        return responseHelper(
          response,
          404,
          'Fail',
          'Goal does not exist',
          false
        );
      }
      if (goal.userId !== userData.id) {
        return responseHelper(
          response,
          404,
          'Fail',
          'Goal does not exist',
          false
        );
      }
      const updatedGoal = await Goal.update(
        {
          goalName,
          goalValue,
          totalSaved,
          timeline,
          description,
          color,
        },
        {
          where: {
            id: goalId,
          },
        }
      );

      return responseHelper(response, 200, 'Success', updatedGoal, true);
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
   * @returns {object} response message
   * @param {object} request
   * @param {object} response
   */
  static async getGoal(request, response) {
    const { goalId } = request.params;
    const { userData } = request;
    try {
      const goal = await queryHelper.findOne(Goal, { id: goalId });
      if (!goal) {
        return responseHelper(
          response,
          404,
          'Fail',
          'Goal does not exist',
          false
        );
      }
      if (goal.userId !== userData.id) {
        return responseHelper(
          response,
          404,
          'Fail',
          'Goal does not exist',
          false
        );
      }

      return responseHelper(response, 200, 'Success', goal, true);
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
   * @returns {object} response message
   * @param {object} request
   * @param {object} response
   */
  static async deleteGoal(request, response) {
    const { goalId } = request.params;
    const { userData } = request;

    try {
      const goal = await queryHelper.findOne(Goal, { id: goalId });

      if (!goal) {
        return responseHelper(
          response,
          404,
          'Fail',
          'Goal does not exist',
          false
        );
      }
      if (goal.userId !== userData.id) {
        return responseHelper(
          response,
          404,
          'Fail',
          'Goal does not exist',
          false
        );
      }

      await Goal.destroy({
        where: {
          id: goalId,
        },
      });

      return responseHelper(
        response,
        204,
        'Success',
        'message deleted succefulloy',
        true
      );
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
   * @returns {object} response message
   * @param {object} request
   * @param {object} response
   */
  static async pauseOrContinueGoal(request, response) {
    const { goalId } = request.params;
    const {
      body: { paused },
      userData,
    } = request;

    try {
      const goal = await queryHelper.findOne(Goal, { id: goalId });

      if (!goal) {
        return responseHelper(
          response,
          404,
          'Fail',
          'Goal does not exist',
          false
        );
      }
      if (goal.userId !== userData.id) {
        return responseHelper(
          response,
          404,
          'Fail',
          'Goal does not exist',
          false
        );
      }

      const pauseOrContinueGoal = await Goal.update(
        {
          paused,
        },
        {
          where: {
            id: goalId,
          },
        }
      );

      return responseHelper(
        response,
        200,
        'Success',
        pauseOrContinueGoal,
        true
      );
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

export default Goals;
