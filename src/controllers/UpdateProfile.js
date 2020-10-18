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
      fullname, email: newEmail, occupation, birthday, imageUrl
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
        'Error',
        "You can't perform this operation",
        false
      );
    }

    const [_, updatedProfile] = await queryHelper.update(User, {
      fullname,
      email: newEmail,
      occupation,
      birthday,
      image: imageUrl
    }, {
      id
    }, true);

    const updatedProfileObject = updatedProfile[0];
    delete updatedProfileObject.dataValues.password;
    return responseHelper(response, 200, 'Success', updatedProfileObject, true);
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
