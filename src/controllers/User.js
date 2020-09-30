import models from '../db/models';
// import tokenHelper from '../middlewares/authentication';
import { response as responseHelper, queryHelper } from '../helpers';

const { User } = models;
/**
 * Handles user signup
 * @param {object} request
 * @param {object} response
 * @returns {object} user
 */
async function getUser(request, response) {
  const {
    userData: { email },
  } = request;
  try {
    const user = await queryHelper.findOne(User, {
      email: email.toLowerCase(),
    });
    if (!user) {
      return responseHelper(
        response,
        404,
        'Error',
        'User does not exists',
        false
      );
    }
    return responseHelper(response, 200, 'Success', user, true);
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

export default getUser;
