class ErrorHandler extends Error {  //Error is inbuild class
  constructor(message, statusCode) {
    super(message);  //calling Error class constructor
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);  //store the location of error
  }
}

module.exports = ErrorHandler;