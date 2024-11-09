import { NextFunction, Response } from "express";
import Course from "../models/course.model";
import { CatchAsyncError } from "../middlewares/catchAsynchErrors";

export const createCourse = CatchAsyncError(
  async (next: NextFunction, res: Response, data: any) => {
    const course = await Course.create(data);
    res.status(201).json({
      success: true,
      course,
    });
  }
);
