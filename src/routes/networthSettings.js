import express from 'express';
import UserNetworthSettings from '../controllers/NetworthSettings'
import Validation from '../middlewares/Validation'
import VerifyUser from '../helpers/token'

const networthSettingsRouter = express.Router();

networthSettingsRouter.put(
    '/networth-settings/update-networth-settings',
    VerifyUser.verifyToken,
    Validation.networthSettingsValidation,
    UserNetworthSettings.updateNetworthSettings
)
networthSettingsRouter.get(
    '/networth-settings/update-networth-settings',
    VerifyUser.verifyToken,
    UserNetworthSettings.getNetworthSettings
)

export default networthSettingsRouter;