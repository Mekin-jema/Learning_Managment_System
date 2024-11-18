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
router.post("/logout", isAuthenticated, logoutUser);
router.get("/refreshToken", updateAccessToken);
router.get("/getUserInfo", isAuthenticated, getUserInfo);
router.post("/social-auth", socialAuth);
router.put("/update-user-info", isAuthenticated, updateUserInfo);
router.post("/update-user-password", isAuthenticated, updatePassword);
router.put("/update-profile", isAuthenticated, updateProfile);
router.get(
  "/get-all-users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);
router.put(
  "/update-user-role",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default router;
