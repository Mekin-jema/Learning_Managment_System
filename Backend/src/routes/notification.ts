import exp from "constants";
import express from "express";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";
import { getNotification } from "../controllers/notification.controller";

const router = express.Router();

router.get(
  "/get-all-notification",
  isAuthenticated,
  authorizeRoles("admin"),
  getNotification
);

export default router;
