import models from "../db/models";
import { response as responseHelper, queryHelper } from "../helpers";

const { User } = models;

class Onboarding {
  static async checkOnboarding(request, response) {
    const {
      userData: { id },
    } = request;
    try {
      const user = await queryHelper.findById(User, id);
      return responseHelper(
        response,
        200,
        "Success",
        {
          onboarded: user.onboarded,
        },
        true
      );
    } catch (error) {
      return responseHelper(response, 500, "Error", error, false);
    }
  }

  static async markOnboarded(request, response) {
    const {
      userData: { id },
    } = request;
    try {
      await User.update({ onboarded: true }, { where: { id } });
      return responseHelper(
        response,
        200,
        "Success",
        { onboarded: true },
        true
      );
    } catch (error) {
      return responseHelper(response, 500, "Error", error, false);
    }
  }
}

export default Onboarding;