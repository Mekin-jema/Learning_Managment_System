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
  updateUserRole,
  deleteUser,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth";

const router = express.Router();

router.post("/register", registrationUser); // /api/v1/register
router.post("/activate-user", activateUser);
router.post("/login", loginUser);
router.post("/logout", updateAccessToken, isAuthenticated, logoutUser);
router.get("/refreshToken", updateAccessToken);
router.get("/getUserInfo", updateAccessToken, isAuthenticated, getUserInfo);
router.post("/social-auth", isAuthenticated, socialAuth);
router.put(
  "/update-user-info",
  updateAccessToken,
  isAuthenticated,
  updateUserInfo
);
router.put(
  "/update-user-password",
  updateAccessToken,
  isAuthenticated,
  isAuthenticated,
  updatePassword
);
router.put(
  "/update-profile",
  updateAccessToken,
  isAuthenticated,
  updateProfile
);
router.get(
  "/get-all-users",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);
router.put(
  "/update-user-role",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);
router.delete(
  "/delete-user/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default router;
