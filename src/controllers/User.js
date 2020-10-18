import models from '../db/models';
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
    userData: { id },
  } = request;
  try {
    const user = await queryHelper.findById(User, id);
    if (!user) {
      return responseHelper(
        response,
        404,
        'Error',
        'User does not exists',
        false
      );
    }
    delete user.dataValues.password;
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
