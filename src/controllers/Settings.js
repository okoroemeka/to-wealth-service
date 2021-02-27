import models from '../db/models';
import { response as responseHelper, queryHelper } from '../helpers';

const { Settings } = models;
class UserSettings {
    static async updateGeneralSettings(request, response) {
        const { userData, body: { darkMode, language, country, currency } } = request;
        try {
            const settings = await queryHelper.findOne(Settings, { userId: userData.id });
            console.log('here');
            if (!settings) {
                console.log('step1');
                const settings = await Settings.create({
                    darkMode, language, country, currency
                });

                return responseHelper(response, 201, 'Success', settings, true)
            } else {
                console.log('step2');
                const [_, updatedSettings] = await Settings.update(
                    {
                        darkMode, language, country, currency
                    },
                    {
                        where: {
                            userId: userData.id
                        },
                        returning: true,
                        plain: true
                    }
                );

                return responseHelper(response, 200, 'Success', updatedSettings, true);
            }
        } catch (error) {
            return responseHelper(response, 500, 'Error', error, false);
        }
    }
}

export default UserSettings;