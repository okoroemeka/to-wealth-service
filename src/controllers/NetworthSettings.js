import models from '../db/models';
import { response as responseHelper, queryHelper } from '../helpers';

const { NetworthSettings } = models;

class UserNetworthSettings {
    static async updateNetworthSettings(request, response) {
        const { userData, body: { interestRate, monthlyIncome } } = request;

        try {
            const networthSettings = await queryHelper.findOne(NetworthSettings, { userId: userData.id });
            if (!networthSettings) {
                const newNetworthSettings = await NetworthSettings.create({ interestRate, monthlyIncome, userId: userData.id })
                return responseHelper(response, 201, 'Success', newNetworthSettings, true);
            }

            const [_, updatedNetworthSettings] = await NetworthSettings.update(
                { interestRate, monthlyIncome }, { where: { userId: userData.id }, returning: true, plain: true }
            )

            return responseHelper(response, 200, 'Success', updatedNetworthSettings, true);
        } catch (error) {
            return responseHelper(response, 500, 'Error', error, false);
        }
    }

    static async getNetworthSettings(request, response) {
        const { userData: { id } } = request;
        try {
            const networthSettings = await queryHelper.findOne(NetworthSettings, { userId: id });
            if (!networthSettings) {
                return responseHelper(response, 404, 'Error', 'Settings not found', false);
            }
            return responseHelper(response, 200, 'Success', networthSettings, true);
        } catch (error) {
            return responseHelper(response, 500, 'Error', error, false);
        }
    }
}

export default UserNetworthSettings;