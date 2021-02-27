/* eslint-disable require-jsdoc */
import models from '../db/models';
import { response as responseHelper, queryHelper } from '../helpers';

const { Settings } = models;
console.log('object :>> ', typeof Settings);
class UserSettings {
  static async updateGeneralSettings(request, response) {
    const {
      userData,
      body: { darkMode, language, country, currency },
    } = request;

    console.log('here', userData.id);

    try {
      const settings = await queryHelper.findById(Settings, userData.id);
      if (!settings) {
        // console.log('step1');
        const newUserSettings = await Settings.create({
          darkMode,
          language,
          country,
          currency,
        });

        return responseHelper(response, 201, 'Success', newUserSettings, true);
      }
      console.log('step2');
      const [_, updatedSettings] = await Settings.update(
        {
          darkMode,
          language,
          country,
          currency,
        },
        {
          where: {
            userId: userData.id,
          },
          returning: true,
          plain: true,
        }
      );

      return responseHelper(response, 200, 'Success', updatedSettings, true);
    } catch (error) {
      console.log('error :>> ', error);
      return responseHelper(response, 500, 'Error', error, false);
    }
  }
}

export default UserSettings;
