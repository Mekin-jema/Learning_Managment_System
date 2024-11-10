import express from "express";
import { editCourse, uploadCourse } from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";

const router = express.Router();

router.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
); // /api/v1/create-course
router.post(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
); // /api/v1/create-course

export default router;
