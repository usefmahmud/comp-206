export const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err) {
    res.status(500).json({
      message: "an internal server error",
    });
  }
};
