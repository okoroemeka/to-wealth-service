import { response as responseHelper, joiSignupSchema } from '../helpers';

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
}
