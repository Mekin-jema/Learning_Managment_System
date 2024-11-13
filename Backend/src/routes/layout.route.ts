import express from "express";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";
import {
  createLayout,
  editLayout,
  getLayoutByType,
} from "../controllers/layout.controller";
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
router.get("/get-layout-by-type", getLayoutByType);

export default router;
