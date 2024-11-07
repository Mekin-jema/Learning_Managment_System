class ErrorHandler extends Error {
  statusCode: Number;
  constructor(statusCode: Number, message: string) {
    super();
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
    this.message = message;
  }
}

export default ErrorHandler;
