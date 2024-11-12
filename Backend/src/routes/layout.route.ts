import express from "express";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";
import { createLayout } from "../controllers/layout.controller";
const router = express.Router();
router.post(
  "/create-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout
);

export default router;
