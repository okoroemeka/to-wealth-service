import express from 'express';

import { userRouter } from './routes';
import registerMiddlewares from './middlewares';
import AuthValidation from './middlewares/authValidation';
import appLogs from '../logger/logger';

const app = express();
const PORT = process.env.PORT || 3000;

registerMiddlewares(app);

app.use('/api/v1', AuthValidation.signupValidation, userRouter);

app.listen(PORT, () => appLogs.info(`Server running on port ${PORT}`));
