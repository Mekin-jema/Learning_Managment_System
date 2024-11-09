import express from "express";
import {
  activateUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  updateAccessToken,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";

const router = express.Router();

router.post("/register", registrationUser); // /api/v1/register
router.post("/activate-user", activateUser);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, authorizeRoles("admin"), logoutUser);
router.get("/refeshToken", updateAccessToken);
router.get("/getUserInfo", isAuthenticated, getUserInfo);

export default router;
