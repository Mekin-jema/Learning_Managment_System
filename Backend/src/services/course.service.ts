import Course from "../models/course.model";
import { Response } from "express";
export const createCourse = async (data: any) => {
  const course = await Course.create(data);
  return course;
};

export const getAllCoursesService = async (res: Response) => {
  const courses = await Course.find().sort({ createdAt: -1 });
  res.status(201).json({
    success: true,
    courses,
  });
  return courses;
};
