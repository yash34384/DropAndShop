const ErrorHanlder = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Wrong mongodb id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHanlder(message, 400);
  }

  //Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${object.key(err.keyValue)} entered`;
    err = new ErrorHanlder(message, 400);
  }

  //JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, try again`;
    err = new ErrorHanlder(message, 400);
  }

  //Token expired error
  if (err.name === "TokenExpiredError") {
    const message = `Json web token is expired`;
    err = new ErrorHanlder(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
}