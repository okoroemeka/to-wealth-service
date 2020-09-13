import {
  response as responseHelper,
  joiSignupSchema,
  joiSignInSchema,
  joiGoalSchema,
} from '../helpers';

/**
 * Validation middleware class
 */
export default class Validation {
  /**
   * @returns {functionCall} signupValidation
   * @param {object} request
   * @param {objec} response
   * @param {function} next
   */
  static async signupValidation(request, response, next) {
    try {
      const validation = joiSignupSchema();
      await validation.validateAsync(request.body);
      return next();
    } catch (error) {
      return responseHelper(response, 400, 'Error', error.message, false);
    }
  }

  /**
   * @returns {functionCall} signInValidation
   * @param {object} request
   * @param {object} response
   * @param {function} next
   */
  static async signInValidation(request, response, next) {
    try {
      const validation = joiSignInSchema();
      await validation.validateAsync(request.body);
      return next();
    } catch (error) {
      return responseHelper(response, 400, 'Error', error.message, false);
    }
  }

  /**
   * @returns {functionCall} goalValidation
   * @param {*} request
   * @param {*} response
   * @param {*} next
   */
  static async goalValidation(request, response, next) {
    try {
      const validation = joiGoalSchema();
      await validation.validateAsync(request.body);
      return next();
    } catch (error) {
      return responseHelper(response, 400, 'Error', error.message, false);
    }
  }
}
