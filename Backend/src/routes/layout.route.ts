import express from "express";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";
import { createLayout, editLayout } from "../controllers/layout.controller";
const router = express.Router();
router.post(
  "/create-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout
);
router.put(
  "/update-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  editLayout
);

export default router;
