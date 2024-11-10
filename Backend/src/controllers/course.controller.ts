import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsynchErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { v2 as cloudinary } from "cloudinary";
import { createCourse } from "../services/course.service";
import Course from "../models/course.model";

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

export const editCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const { thumbnail } = data;

      if (thumbnail && thumbnail.public_id) {
        await cloudinary.uploader.destroy(thumbnail.public_id);
        const myCloud = await cloudinary.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const courseId = req.params.id;
      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        {
          $set: data, // update the course with the data
        },
        {
          new: true, // means return the updated course
        }
      );
      if (!updatedCourse) {
        return next(new ErrorHandler(404, "Course not found with this ID"));
      }

      res.status(200).json({
        success: true,
        message: "Course updated successfully",
        updatedCourse,
      });
    } catch (error: any) {
      console.error("Error in editCourse:", error);
      return next(new ErrorHandler(error.message || "Server error", 500));
    }
  }
);

//get sigle course without purchase
export const getSingleCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const course = await Course.findById(req.params.id).select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.link"
      );

      if (!course) {
        return next(new ErrorHandler(404, "Course not found with this ID"));
      }

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      console.error("Error in getSingleCourse:", error);
      return next(new ErrorHandler(error.message || "Server error", 500));
    }
  }
);
