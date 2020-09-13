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
}

export default Goals;
