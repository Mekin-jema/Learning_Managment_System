import express from "express";
import {
  activateUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registrationUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateUserInfo,
  updateProfile,
  getAllUsers,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";

const router = express.Router();

router.post("/register", registrationUser); // /api/v1/register
router.post("/activate-user", activateUser);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);
router.get("/refeshToken", updateAccessToken);
router.get("/getUserInfo", isAuthenticated, getUserInfo);
router.post("/socialAuth", socialAuth);
router.put("/updateUserInfo", isAuthenticated, updateUserInfo);
router.post("/update-user-password", isAuthenticated, updatePassword);
router.put("/update-profile", isAuthenticated, updateProfile);
router.put(
  "/get-all-users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);

export default router;
