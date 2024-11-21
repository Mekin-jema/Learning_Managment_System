import express from "express";
import {
  getUserAnalytics,
  getCouresAnalytics,
  getOrdersAnalytics,
} from "../controllers/analytics.controller";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";
import { updateAccessToken } from "../controllers/user.controller";

const router = express.Router();

router.get(
  "/get-users-analytics",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getUserAnalytics
);
router.get(
  "/get-courses-analytics",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getCouresAnalytics
);
router.get(
  "/get-orders-analytics",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getOrdersAnalytics
);
export default router;
