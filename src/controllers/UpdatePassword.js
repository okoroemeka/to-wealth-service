import { compareSync } from 'bcrypt';
import models from '../db/models';
import { response as responseHelper, queryHelper } from '../helpers';

const { User } = models;
/**
 * Handles user signup
 * @param {object} request
 * @param {object} response
 * @returns {object} user
 */
async function updateProfile(request, response) {
  const {
    userData: { id }, body: {
      oldPassword, newPassword, confirmPassword
    }
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

    if (id !== user.id) {
      return responseHelper(
        response,
        403,
        'Fail',
        "You can't perform this operation",
        false
      );
    }

    const checkPassword = compareSync(oldPassword, user.password);
    const checkNewPassword = compareSync(newPassword, user.password);

    if (!checkPassword) {
      return responseHelper(
        response,
        400,
        'Fail',
        'Your old password is wrong',
        false
      );
    }

    if (checkNewPassword) {
      return responseHelper(
        response,
        400,
        'Fail',
        "You can't re-use your old password",
        false
      );
    }

    if (newPassword !== confirmPassword) {
      return responseHelper(
        response,
        400,
        'Fail',
        'The new passwords does not match the confirm password',
        false
      );
    }

    await queryHelper.update(User, {
      password: newPassword
    }, {
      id
    }, true, true);

    return responseHelper(response, 200, 'Success', { message: 'password updated successfully' }, true);
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

export default updateProfile;
