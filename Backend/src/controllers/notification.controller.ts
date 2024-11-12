import Notifiation from "../models/notification.model";
import { CatchAsyncError } from "../middlewares/catchAsynchErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { NextFunction, Response, Request } from "express";
import cron from "node-cron";
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

//update  notification status -- only admin
export const readNotification = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await Notifiation.findById(req.params.id);
      notification?.status
        ? (notification.status = "read")
        : notification?.status;
      await notification?.save();
      const notifications = await Notifiation.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error) {}
  }
);

// delete notification -- only admin

cron.schedule("0 0 * * *", async () => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await Notifiation.deleteMany({
      status: "read",
      createdAt: { $lt: thirtyDaysAgo },
    });
    console.log("Deleted read notification");
  } catch (error) {
    console.log(error);
  }
});
