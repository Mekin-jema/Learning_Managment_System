import Notifiation from "../models/notification.model";
import { CatchAsyncError } from "../middlewares/catchAsynchErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { NextFunction, Response, Request } from "express";

//  for admin only
export const getNotification = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await Notifiation.find().sort({ createAt: -1 });

      res.status(201).json({
        success: true,
        notification,
      });
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
);
