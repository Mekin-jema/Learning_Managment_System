import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsynchErrors";
import ErrorHandler from "../utils/ErrorHandler";
import mongoose, { Types, Document } from "mongoose";
import path from "path";
import ejs from "ejs";
import sendMail from "./sendMail";
import Order from "../models/order.model";
import Notifiation from "../models/notification.model";
import Course from "../models/course.model";
import User, { IUser } from "../models/user.model";
import { newOrder } from "../services/order.service";

//create order

interface IOrder {
  userId: string;
  payment_info: object;
  courseId: string;
}

export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;

      // Fetch course and assert the type
      const course = (await Course.findById(courseId)) as {
        _id: mongoose.Types.ObjectId;
        name: string;
        price: number;
        purchased: number;
        save: () => Promise<void>;
      };
      console.log(course);
      if (!course) {
        return next(new ErrorHandler(404, "Course not found"));
      }

      const user = await User.findById(req.user?._id);
      if (!user) {
        return next(new ErrorHandler(404, "User not found"));
      }

      // Check if the user already has the course
      const courseExist = user.courses.some((c) => c.courseId === courseId);

      if (courseExist) {
        return next(
          new ErrorHandler(400, "You have already purchased this course")
        );
      }

      // Add course ID to user's courses and save
      user.courses.push({ courseId: course._id.toString() });

      // Prepare mail data
      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      // Send confirmation email
      try {
        await sendMail({
          email: user.email,
          subject: "Order Confirmation",
          template: "order-confirmation.ejs",
          data: mailData,
        });
      } catch (error: any) {
        return next(new ErrorHandler(500, error.message));
      }

      const data: any = {
        userId: user._id,
        payment_info,
        courseId,
      };
      // Create notification
      const notification = await Notifiation.create({
        userId: user._id,
        title: "New Order",
        message: `You have a new order: ${course.name}`,
      });
      // if (course.purchased + 1) {
      //   course.purchased += 1;
      // }

      course.purchased ? (course.purchased += 1) : course.purchased;
      // Respond with success
      newOrder(data, res, next);
      await course.save();
      await user.save();
    } catch (error: any) {
      return next(new ErrorHandler(500, error.message));
    }
  }
);
