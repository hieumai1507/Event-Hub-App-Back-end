const errorMiddleHandler = (error, _req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({
    message: "",
    statusCode,
    stack: error.stack,
  });
  next();
};
module.exports = errorMiddleHandler;
