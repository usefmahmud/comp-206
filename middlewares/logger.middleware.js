export const logger = (req, res, next) => {
  console.log(`${req.method} on ${req.url} at ${new Date().toISOString()}`);
  next();
};
