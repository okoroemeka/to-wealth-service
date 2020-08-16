import { compareSync } from 'bcrypt';
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
      ({ id: user.id, email }, { expiresIn: '4h' })
    );
    const userResponseInfo = {
      email: user.email,
      token,
    };
    return response.status(201).json({
      status: 'Success',
      data: userResponseInfo,
    });
  } catch (error) {
    return response.status(500).json({
      status: 'Error',
      message: 'An error occured, please try again later',
    });
  }
}

export default userSignUp;
