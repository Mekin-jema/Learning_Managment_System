import express from "express";
import { uploadCourse } from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";

const router = express.Router();

router.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
); // /api/v1/create-course

export default router;
