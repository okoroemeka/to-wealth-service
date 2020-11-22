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
      body: {
        goalName,
        goalValue,
        totalSaved,
        timeline,
        description,
        category,
      },
      userData,
    } = request;

    try {
      const goal = await Goal.create({
        goalName,
        goalValue: Number(goalValue),
        totalSaved: Number(totalSaved),
        timeline,
        description,
        category,
        userId: userData.id,
        completionRate: ((totalSaved / goalValue) * 100).toFixed(2),
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
    const { userData, query } = request;

    const enums = {
      active: 'active',
      reached: 'completed',
      paused: 'paused',
    };

    Object.freeze(enums);
    let goals = [];

    const attributes = [
      'id',
      'goalName',
      'goalValue',
      'totalSaved',
      'timeline',
      'description',
      'completionRate',
      'category',
      'completed',
      'paused',
    ];

    try {
      if (!Object.keys(query).length || query.goalQueryParam === enums.active) {
        goals = await queryHelper.findAll(
          Goal,
          {
            userId: userData.id,
            completed: false,
          },
          attributes
        );
      }
      if (query.goalQueryParam === enums.reached) {
        goals = await queryHelper.findAll(
          Goal,
          {
            userId: userData.id,
            completed: true,
          },
          attributes
        );
      }
      if (query.goalQueryParam === enums.paused) {
        goals = await queryHelper.findAll(
          Goal,
          {
            userId: userData.id,
            paused: true,
            completed: false,
          },
          attributes
        );
      }
      if (!goals.length) {
        return responseHelper(response, 404, 'Fail', 'No goal found', false);
      }
      return responseHelper(response, 200, 'Success', goals, true);
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
      const [_, updatedGoal] = await Goal.update(
        {
          goalName,
          goalValue,
          totalSaved,
          timeline,
          description,
          color,
          completionRate: ((totalSaved / goalValue) * 100).toFixed(2),
        },
        {
          where: {
            id: goalId,
          },
          returning: true,
          plain: true,
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
  static async topUPGoal(request, response) {
    try {
      const { goalId } = request.params;

      const {
        body: { topUpValue },
        userData: { id },
      } = request;

      const goal = await queryHelper.findOne(Goal, {
        id: goalId,
        userId: id,
      });

      if (!goal) {
        return responseHelper(
          response,
          404,
          'Fail',
          'Goal does not exist',
          false
        );
      }

      const { goalValue, totalSaved } = goal;

      if (Number(topUpValue) + Number(totalSaved) > goalValue) {
        return responseHelper(
          response,
          400,
          'Fail',
          totalSaved === goalValue
            ? 'goal has been reached already'
            : `Top up value is more than required. You need top up goal with ${
                goalValue - Number(totalSaved)
              } or lower`,
          false
        );
      }

      await queryHelper.update(
        Goal,
        {
          totalSaved: Number(topUpValue) + Number(totalSaved),
          completionRate: (
            ((Number(topUpValue) + Number(totalSaved)) / goalValue) *
            100
          ).toFixed(2),
          completed: Number(topUpValue) + Number(totalSaved) === goalValue,
        },
        {
          id: goalId,
          userId: id,
        },
        true
      );
      return responseHelper(
        response,
        200,
        'Success',
        'Top up was successful',
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

  /**
   * @returns {object} response message
   * @param {object} request
   * @param {object} response
   */
  static async markGoalAscomplete(request, response) {
    const { goalId } = request.params;
    const {
      body: { completed },
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
      const completeGoal = await Goal.update(
        {
          completed,
        },
        {
          where: {
            id: goalId,
          },
        }
      );
      return responseHelper(response, 200, 'Success', completeGoal, true);
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
