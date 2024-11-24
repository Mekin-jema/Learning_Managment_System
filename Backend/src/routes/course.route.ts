import express from "express";
import {
  editCourse,
  getSingleCourse,
  uploadCourse,
  getRestrictedCourses,
  getCoursesByUser,
  addQuestion,
  addAnswer,
  addReview,
  addReplyToReview,
  deleteCourse,
  generateVideoUrl,
  getAdminCourses,
} from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";
import { getCouresAnalytics } from "../controllers/analytics.controller";
import { updateAccessToken } from "../controllers/user.controller";

const router = express.Router();

router.post(
  "/create-course",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);
router.put(
  "/edit-course/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);
// ...existing code...
router.get(
  "/get-course/:id",
  updateAccessToken,
  isAuthenticated,
  getSingleCourse
);
router.get(
  "/get-user-course",
  updateAccessToken,
  isAuthenticated,
  getRestrictedCourses
);
router.get(
  "/get-user-courses/:id",
  updateAccessToken,
  isAuthenticated,
  getCoursesByUser
);
router.put("/add-question", updateAccessToken, isAuthenticated, addQuestion);
router.put("/add-answer", updateAccessToken, isAuthenticated, addAnswer);
router.post(
  "/add-review/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  addReview
);
router.post(
  "/add-reply-review",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  addReplyToReview
);
router.get(
  "/get-admin-courses",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAdminCourses
);
router.post(
  "/get-vdo-CipherOTP",
  // authorizeRoles("admin"),
  generateVideoUrl
);
router.delete(
  "/delete-course/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  deleteCourse
);

export default router;
