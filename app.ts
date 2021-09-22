import express from "express";
import { connectToPostgres } from "./connections/postgres.connection";
import { registerMiddlewares } from "./routes/routes";

export const startserver =async () => {
  const app = express();
  await connectToPostgres();
  const PORT = process.env.PORT;

  registerMiddlewares(app);
  app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
  });
};
