import { Response, Request, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsynchErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { redis } from "../db/redisDatabase";

dotenv.config();

// authenticated user
export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const access_token = req.cookies.access_token;
      console.log(access_token);

      if (!access_token) {
        return next(
          new ErrorHandler(400, "Pleae login to  access this resource ")
        );
      }
      const decoded = jwt.verify(
        access_token,
        process.env.ACESS_TOKEN as string
      ) as JwtPayload;
      if (!decoded) {
        return next(new ErrorHandler(400, "access token is not valid "));
      }

      const user = await redis.get(decoded.id);

      if (!user) {
        return next(new ErrorHandler(400, "User is not Found"));
      }
      // declare the  global file to remove  the error
      req.user = JSON.parse(user);
      next();
    } catch (error: any) {
      return next(new ErrorHandler(400, error.message));
    }
  }
);
