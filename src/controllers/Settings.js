/* eslint-disable require-jsdoc */
import models from '../db/models';
import { response as responseHelper, queryHelper } from '../helpers';

const { Settings } = models;
class UserSettings {
    static async updateGeneralSettings(request, response) {
        const {
            userData,
            body: { darkMode, language, country, currency, countryCode },
        } = request;

        try {
            const settings = await queryHelper.findById(Settings, userData.id);
            if (!settings) {
                const newUserSettings = await Settings.create({
                    darkMode,
                    language,
                    country,
                    countryCode,
                    currency,
                    userId: userData.id
                });

                return responseHelper(response, 201, 'Success', newUserSettings, true);
            }
            const [_, updatedSettings] = await Settings.update(
                {
                    darkMode,
                    language,
                    country,
                    countryCode,
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
            return responseHelper(response, 500, 'Error', error, false);
        }
    };

    static async viewGeneralSettings(request, response) {
        const { userData: { id } } = request;
        try {
            const settings = await Settings.findOne({where: { userId: id }, attributes: ['darkMode', 'country', 'countryCode', 'currency', 'language']});
            if (!settings) {
                return responseHelper(response, 404, 'Error', 'Settings not found', false);
            }
            return responseHelper(response, 200, 'Success', settings, true);
        } catch (error) {
            return responseHelper(response, 500, 'Error', error, false);
        }
    }
}

export default UserSettings;
