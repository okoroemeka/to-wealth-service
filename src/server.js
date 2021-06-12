import express from "express";

import {
  userRouter,
  goalRouter,
  budgetRouter,
  settingsRouter,
  networthSettingsRouter,
  categoryRouter,
  transactionRouter,
  networthRouter,
  onboardingRouter,
} from "./routes";
import registerMiddlewares from "./middlewares";
import appLogs from "../logger/logger";

const app = express();
const PORT = process.env.PORT || 3000;

registerMiddlewares(app);

app.use("/api/v1", userRouter);
app.use("/api/v1", goalRouter);
app.use("/api/v1", budgetRouter);
app.use("/api/v1", settingsRouter);
app.use("/api/v1", networthSettingsRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", transactionRouter);
app.use("/api/v1", networthRouter);
app.use("/api/v1", transactionRouter);
app.use("/api/v1", onboardingRouter);

app.use("*", (_, res) => {
  res.status(404).json({
    status: "Fail",
    message: "Not found",
  });
});

app.listen(PORT, () => appLogs.info(`Server running on port ${PORT}`));
