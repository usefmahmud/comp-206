export const auth = (req, res, next) => {
  if (!req.session.loggedin) {
    res.status(401).json({
      error_message: "you are not logged in",
    });
    return;
  }
  next();
};
