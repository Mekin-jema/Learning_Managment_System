import exp from "constants";
import express from "express";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";
import {
  getNotification,
  readNotification,
} from "../controllers/notification.controller";

const router = express.Router();

router.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  getNotification
);
router.get(
  "/read-notification/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  readNotification
);

export default router;
