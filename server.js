import express from "express";

import usersRouter from "./routes/users.route.js";
import todosRouter from "./routes/todos.route.js";

import { logger } from "./middlewares/logger.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { auth } from "./middlewares/auth.middleware.js";

const app = express();

app.use(express.json());
app.use(logger);

app.use("/users", usersRouter);
app.use("/todos", auth, todosRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("server is running on https://localhost:8000");
});
