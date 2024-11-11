import express from "express";
import {
  editCourse,
  getSingleCourse,
  uploadCourse,
  getAllCourses,
  getCoursesByUser,
  addQuestion,
  addAnswer,
  addReview,
  addReplyToReview,
} from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";

const router = express.Router();

router.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);
router.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);
// ...existing code...
router.get("/get-course/:id", isAuthenticated, getSingleCourse);
router.get("/get-course", isAuthenticated, getAllCourses);
router.get("/get-user-courses/:id", isAuthenticated, getCoursesByUser);
router.put("/add-question", isAuthenticated, addQuestion);
router.put("/add-answer", isAuthenticated, addAnswer);
router.post("/add-review/:id", isAuthenticated, addReview);
router.post(
  "/add-reply-review",
  isAuthenticated,
  authorizeRoles("admin"),
  addReplyToReview
);

export default router;
