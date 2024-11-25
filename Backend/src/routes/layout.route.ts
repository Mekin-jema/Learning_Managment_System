import express from "express";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";
import {
  createLayout,
  editLayout,
  getLayoutByType,
} from "../controllers/layout.controller";
import { updateAccessToken } from "../controllers/user.controller";
const router = express.Router();
router.post(
  "/create-layout",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout
);
router.put(
  "/update-layout",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  editLayout
);
router.get("/get-layout/:type", updateAccessToken, getLayoutByType);

export default router;
