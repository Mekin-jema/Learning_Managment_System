import exp from "constants";
import express from "express";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";
import {
  getNotification,
  readNotification,
} from "../controllers/notification.controller";
import { getAllOrders } from "../controllers/order.controller";
import { updateAccessToken } from "../controllers/user.controller";

const router = express.Router();

router.get(
  "/get-all-notifications",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getNotification
);
router.put(
  "/read-notification/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  readNotification
);

export default router;
