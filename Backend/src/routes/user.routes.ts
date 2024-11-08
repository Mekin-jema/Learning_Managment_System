import express from "express";
import {
  activateUser,
  loginUser,
  registrationUser,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/register", registrationUser); // /api/v1/register
router.post("/activate-user", activateUser);
router.post("login-user", loginUser);

export default router;
