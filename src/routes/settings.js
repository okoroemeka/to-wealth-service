import express from 'express';
import UserSettings from '../controllers/Settings';
import Validation from '../middlewares/Validation';
import VerifyUser from '../helpers/token';

const settingsRouter = express.Router();

settingsRouter.put(
  '/settings/update-general-settings',
  VerifyUser.verifyToken,
  Validation.generalSettingsValidation,
  UserSettings.updateGeneralSettings
);

settingsRouter.get(
    '/settings/get-general-settings',
    VerifyUser.verifyToken,
    UserSettings.viewGeneralSettings
);

export default settingsRouter;
