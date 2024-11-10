import express from "express";
import {
  editCourse,
  getSingleCourse,
  uploadCourse,
  getAllCourses,
} from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";

const router = express.Router();

router.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
); // /api/v1/create-course
router.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
); // /api/v1/create-course
router.get(
  "/get-course/:id",
  isAuthenticated,
  // authorizeRoles("admin"),
  getSingleCourse
);
router.get(
  "/get-course",
  isAuthenticated,
  // authorizeRoles("admin"),
  getAllCourses
);

export default router;
