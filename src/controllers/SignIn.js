import { compareSync } from 'bcrypt';
import models from '../db/models';
import {
  response as responseHelper,
  queryHelper,
  tokenHelper,
} from '../helpers';

const { User } = models;
/**
 * Handles user signin
 * @param {object} request
 * @param {object} response
 * @returns {object} user
 */
async function SignIn(request, response) {
  const { email, password } = request.body;
  try {
    const user = await queryHelper.findOne(User, {
      email: email.toLowerCase(),
    });
    if (!user) {
      return responseHelper(
        response,
        400,
        'Fail',
        'User does not exist, signup to continue',
        false
      );
    }
    const checkPassword = compareSync(password, user.password);
    if (!checkPassword) {
      return responseHelper(
        response,
        400,
        'Fail',
        'Incorrect login credential',
        false
      );
    }
    const token = tokenHelper.generateToken(
      { id: user.id, email, isDoctor: user.isDoctor },
      { expiresIn: '24h' }
    );
    return responseHelper(
      response,
      200,
      'Success',
      { message: 'Welcome back!', email: user.email, token },
      true
    );
  } catch (error) {
    return responseHelper(response, 500, 'Error', 'An error occured', false);
  }
}

export default SignIn;
