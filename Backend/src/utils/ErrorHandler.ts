class ErrorHandler extends Error {
  statusCode: Number;
  constructor(statusCode: Number, message: any) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
    this.message = message;
  }
}

export default ErrorHandler;
