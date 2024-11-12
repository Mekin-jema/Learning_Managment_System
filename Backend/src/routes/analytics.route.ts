import express from "express";
import {
  getUserAnalytics,
  getCouresAnalytics,
  getOrdersAnalytics,
} from "../controllers/analytics.controller";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";

const router = express.Router();

router.get(
  "/get-users-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getUserAnalytics
);
router.get(
  "/get-courses-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getCouresAnalytics
);
router.get(
  "/get-orders-analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  getOrdersAnalytics
);
export default router;
