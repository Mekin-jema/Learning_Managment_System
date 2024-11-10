import Course from "../models/course.model";
import ErrorHandler from "../utils/ErrorHandler";

// This function should be asynchronous and return the created course document
export const createCourse = async (data: any) => {
  const course = await Course.create(data);
  return course;
};
