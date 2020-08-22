import express from 'express';

import { userRouter } from './routes';
import registerMiddlewares from './middlewares';
import appLogs from '../logger/logger';

const app = express();
const PORT = process.env.PORT || 3000;

registerMiddlewares(app);

try {
  app.use('/api/v1', userRouter);
  app.use('*', (_, res) => {
    res.status(404).json({
      status: 'Fail',
      message: 'Not found',
    });
  });
} catch (error) {
  appLogs.log();
}

app.listen(PORT, () => appLogs.info(`Server running on port ${PORT}`));
