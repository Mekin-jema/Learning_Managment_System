import { Response, Request, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (
  err: any,

  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  //wrong MONGODB error
  if (err.name == "CastError") {
    const message = `Resource not found.Invalid:${err.path}`; //err.path is the field that is invalid
    err = new ErrorHandler(400, message);
  }
  //Duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(400, message);
  }
  //wrong JWT error
  if (err.name == "JsonWebTokenError") {
    const message = `Json Web Token is invalid.Try Again`;
    err = new ErrorHandler(400, message);
  }
  // JWT Expired error
  if (err.name == "TokenExpiredError") {
    const message = `Json Web Token is expired.Try Again`;
    err = new ErrorHandler(400, message);
  }
  //Validation Error

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
