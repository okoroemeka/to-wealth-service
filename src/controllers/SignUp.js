import models from '../db/models';
// import tokenHelper from '../middlewares/authentication';
import {
  response as responseHelper,
  queryHelper,
  tokenHelper,
} from '../helpers';

const { User } = models;
/**
 * Handles user signup
 * @param {object} request
 * @param {object} response
 * @returns {object} new user
 */
async function userSignUp(request, response) {
  const { fullname, email, password } = request.body;
  const userInfo = { fullname, email: email.toLowerCase(), password };
  try {
    const checkUser = await queryHelper.findOne(User, {
      email: email.toLowerCase(),
    });
    if (checkUser) {
      return responseHelper(
        response,
        400,
        'Error',
        'User already exists, signin to continue',
        false
      );
    }
    const user = await User.create(userInfo);
    const token = tokenHelper.generateToken(
      { id: user.id, email },
      { expiresIn: '24h' }
    );
    const userResponseInfo = {
      email: user.email,
      token,
    };
    return responseHelper(response, 201, 'Success', userResponseInfo, true);
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

export default userSignUp;
