import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsynchErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { v2 as cloudinary } from "cloudinary";
import { createCourse } from "../services/course.service";

export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const { thumbnail } = data;

      if (thumbnail) {
        const result = await cloudinary.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      }

      const course = await createCourse(data);
      res.status(201).json({
        success: true,
        message: "Course created successfully",
        course,
      });
    } catch (error: any) {
      console.error("Error in uploadCourse:", error);
      return next(new ErrorHandler(error.message || "Server error", 500));
    }
  }
);
