import express from "express";
import { connectToPostgres } from "./connections/postgres.connection";
import { registerMiddlewares } from "./routes/routes";
import { AuthGuard } from "./utility/authorization.middleware";

export const startserver =async () => {
  const app = express();
  app.use(AuthGuard(['/user/register','/user/login']))
  await connectToPostgres();
  const PORT = process.env.PORT;

  registerMiddlewares(app);
  app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
  });
};
