import express from "express";

import usersRouter from "./routes/users.route.js";
import todosRouter from "./routes/todos.route.js";

import { logger } from "./middlewares/logger.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { auth } from "./middlewares/auth.middleware.js";
import session from "express-session";

import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger);

app.use(
  session({
    secret: "test",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000000,
    },
  })
);

app.use(express.static("public")); // /script.js

app.use("/users", usersRouter);
app.use("/todos", auth, todosRouter);

app.use(errorHandler);

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
  });
}

// Export the Express app for Vercel
export default app;
