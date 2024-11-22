import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsynchErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { v2 as cloudinary } from "cloudinary";
import { createCourse, getAllCoursesService } from "../services/course.service";
import Course from "../models/course.model";
import { redis } from "../db/redisDatabase";
import mongoose from "mongoose";

import sendEmail from "../controllers/sendMail";
import Notifiation from "../models/notification.model";
import axios from "axios";

export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      // console.log(data);
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
      // await redis.set(data.name, JSON.stringify(data));

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
      const courseId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return next(new ErrorHandler(400, "Invalid Course ID"));
      }
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return next(new ErrorHandler(400, "Content ID is not valid"));
      }
      const courseExist = await Course.findById(courseId);
      if (!courseExist) {
        return next(new ErrorHandler(404, "Course is not found"));
      }
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

//get single course without purchase
export const getSingleCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const isCacheExist = await redis.get(courseId);
      if (isCacheExist) {
        const course = JSON.parse(isCacheExist);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await Course.findById(req.params.id).select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.link"
        );
        await redis.set(req.params.id, JSON.stringify(course), "EX", 604800); // 7 days
        if (!course) {
          return next(new ErrorHandler(404, "Course not found with this ID"));
        }

        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      console.error("Error in getSingleCourse:", error);
      return next(new ErrorHandler(error.message || "Server error", 500));
    }
  }
);

//get all courses without purchase
export const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCacheExist = await redis.get("allCourses");
      if (isCacheExist) {
        const courses = JSON.parse(isCacheExist);
        return res.status(200).json({
          success: true,
          courses,
        });
      }
      const courses = await Course.find().select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.link"
      );

      await redis.set("allCourses", JSON.stringify(courses));
      // const response = await redis.get("allCourses");

      res.status(200).json({
        success: true,
        courses: courses,
        message: "Courses fetched successfully",
      });
    } catch (error: any) {
      console.error("Error in getAllCourses:", error);
      return next(new ErrorHandler(error.message || "Server error", 500));
    }
  }
);

//  get course content with valid user
export const getCoursesByUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;
      const courseExist = userCourseList?.find(
        (course) => course.courseId === courseId
      );

      if (courseExist) {
        const course = await Course.findById(courseId);
        if (!course) {
          return next(new ErrorHandler(404, "Course not found with this ID"));
        }
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        return next(
          new ErrorHandler(403, "You do not have access to this course")
        );
      }
    } catch (error: any) {
      console.error("Error in getCourseByUser:", error);
      return next(new ErrorHandler(error.message || "Server error", 500));
    }
  }
);

// add question in course
interface IAdddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body as IAdddQuestionData;
      // const data: IAdddQuestionData = req.body; // this is also correct they are same way of writing type

      const { question, courseId, contentId } = data;
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler(400, "Content ID is not valid"));
      }
      const course = await Course.findById(courseId);

      const courseContent = course?.courseData?.find(
        // (content: any) => content._id === contentId
        (content: any) => content._id.equals(contentId)
      );
      if (!courseContent) {
        return next(new ErrorHandler(404, "Content not found with this ID"));
      }
      //create a new question object
      const newQuestion: any = {
        question,
        user: req.user,
        questionReplies: [],
      };
      //save the updated course

      //add this question to course content
      courseContent.questions.push(newQuestion);
      await Notifiation.create({
        user: req.user?._id,
        title: "New Question received",
        message: `${req.user?.name} has asked a question on ${courseContent.title}`,
      });
      res.status(200).json({
        success: true,
        message: "Question added successfully",
        course,
      });
      await course?.save();
    } catch (error: any) {
      console.error("Error in addQuestion:", error);
      return next(new ErrorHandler(error.message || "Server error", 500));
    }
  }
);

// add answer in course question

interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

export const addAnswer = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body as IAddAnswerData;
      const { answer, courseId, contentId, questionId } = data;
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler(400, "Content ID is not valid"));
      }
      const course = await Course.findById(courseId);

      const courseContent = course?.courseData?.find((content: any) =>
        content._id.equals(contentId)
      );
      if (!courseContent) {
        return next(new ErrorHandler(404, "Content not found with this ID"));
      }

      const question = courseContent.questions.find((question: any) =>
        question._id.equals(questionId)
      );
      if (!question) {
        return next(new ErrorHandler(404, "Question not found with this ID"));
      }

      const newAnswer: any = {
        answer,
        user: req.user,
      };

      question?.questionReplies?.push(newAnswer); //added questionReplies to question wiht opetion mark
      await course?.save();

      //not that question  user  type must be user model type
      if (req.user?._id === question.user._id) {
        //if user is same who asked the question then do not send notification
        //create notifiation  when the notifiction model is create it will doone
        await Notifiation.create({
          user: req.user?._id,
          title: "Question Answered",
          message: `Your question has been answered on ${courseContent.title}`,
        });
      } else {
        const data = {
          name: question.user.name,
          title: courseContent.title,
        };
        // whas the benefit of this html variable ?

        // const html: any = await ejs.renderFile(
        //   path.join(__dirname, "../mails/question-reply.ejs"),
        //   data
        // );
        try {
          await sendEmail({
            email: question.user.email,
            subject: "Question Reply",
            template: "question-reply.ejs",
            data,
          });
        } catch (error: any) {
          console.error("Error in sending email:", error);
          return next(new ErrorHandler(error.message || "Server error", 500));
        }
      }
      res.status(200).json({
        success: true,
        message: "Answer added successfully",
        course,
      });
    } catch (error: any) {
      console.error("Error in addAnswer:", error);
      return next(new ErrorHandler(error.message || "Server error", 500));
    }
  }
);

// add review in course
interface IAddReviewData {
  review: string;
  ratings: number;
  courseId: string;
  userId: string;
}
export const addReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;

      const courseId = req.params.id;

      //check if courseId exist in user course list based on user id

      const courseExist = userCourseList?.some(
        (course: any) => course.courseId === courseId
      );

      if (!courseExist) {
        return next(
          new ErrorHandler(400, "You have not purchased this course")
        );
      }

      const course = await Course.findById(courseId);

      const { review, ratings } = req.body as IAddReviewData;

      const reviewData: any = {
        user: req.user,
        comment: review,
        ratings,
      };

      course?.reviews.push(reviewData);

      let avg = 0;

      course?.reviews.forEach((rev: any) => {
        avg += rev.rating;
      });

      if (course) {
        course.ratings = avg / course.reviews.length;
      }

      await course?.save();

      const notification = {
        title: "New Review received",
        message: `${req.user?.name} has added a review to your course ${course?.name}`,
      };
      // create notification

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add reply in review
interface IAddReviewData {
  comment: string;
  courseId: string;
  reviewId: string;
}
export const addReplyToReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comment, courseId, reviewId } = req.body as IAddReviewData;
      const course = await Course.findById(courseId);
      if (!course) {
        return next(new ErrorHandler(404, "Course not found"));
      }
      const rev = course?.reviews?.find(
        (rev: any) => rev._id.toString() === reviewId
      );
      if (!rev) {
        return next(new ErrorHandler(404, "Review not found"));
      }
      const replyData: any = {
        user: req.user,
        comment,
      };
      course.reviews.push(replyData);
      await course.save();

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
//get all courses ---admin only
export const getAllCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCoursesService(res);
    } catch (error: any) {
      return next(new ErrorHandler(400, error.message));
    }
  }
);

// delete course --- admin only
export const deleteCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      console.log(courseId);

      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return next(new ErrorHandler(400, "Invalid Course ID"));
      }
      await redis.del(req.params.id);
      const course = await Course.findById(courseId);
      if (!course) {
        return next(new ErrorHandler(404, "Course not found"));
      }
      await course.deleteOne({ _id: courseId });
      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(400, error.message));
    }
  }
);

export const generateVideoUrl = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.body;
      const response = await axios.post(
        `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
        { ttl: 300 },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
          },
        }
      );
      res.json(response.data);
    } catch (error: any) {
      return next(new ErrorHandler(400, error.message));
    }
  }
);
