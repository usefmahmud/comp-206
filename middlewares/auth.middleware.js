import { users } from "../storage/user.store.js";

export const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(403).json({
      error_message: "you did not provide an auth token",
    });
  }
  const foundUser = users.find((user) => user.token === token);
  if (foundUser) {
    req.user = foundUser;
    next();
  } else {
    res.status(401).json({
      error_message: "unauthorized",
    });
  }
};
