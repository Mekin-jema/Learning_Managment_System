import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import { CatchAsyncError } from "../middlewares/catchAsynchErrors";
// Register a user => /api/v1/register
import dotenv from "dotenv";
import sendMail from "./sendMail";
import { sendToken } from "../utils/jwt";
dotenv.config();
interface IRegistirationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registrationUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const userExist = await User.findOne({ email });

      if (userExist) {
        return next(new ErrorHandler(400, "Email already exists"));
      }
      const user: IRegistirationBody = {
        name,
        email,
        password,
      };
      // User.create(user);
      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;

      const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      );
      try {
        await sendMail({
          email: user.email,
          subject: "Activation Your accout",
          template: "activation-mail.ejs",
          data,
        });
        res.status(201).json({
          success: true,
          message: `Please check your email:${user.email} to activate your account`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(400, error.message));
      }
    } catch (error: any) {
      return next(new ErrorHandler(400, error.message));
    }
  }
);

interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    { user, activationCode },
    process.env.SECRET_KEY as Secret,
    {
      expiresIn: "5m",
    }
  );
  return { token, activationCode };
};

//activate user
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

export const activateUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequest;
      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.SECRET_KEY as string
      ) as { user: IUser; activationCode: string };
      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler(400, "Invalide activatin code "));
      }
      const { name, email, password } = newUser.user;
      const existUser = await User.findOne({ email });
      if (existUser) {
        return next(new ErrorHandler(400, "Email already Exist "));
      }
      const user = await User.create({
        name,
        email,
        password,
      });
      res.status(201).json({ sucess: true });
    } catch (error: any) {
      return next(new ErrorHandler(400, error.message));
    }
  }
);

// login in user

interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;

      if (!email || !password) {
        return next(new ErrorHandler(400, "Please enter email and password"));
      }
      const user = await User.findOne({ email }).select("-password");

      if (!user) {
        return next(new ErrorHandler(400, "Invalid email or passsword"));
      }
      const isPsswordMatched = await user.comparePassword(password);
      if (!isPsswordMatched) {
        return next(new ErrorHandler(400, "Invalid email or password"));
      }
      // const token = user.SignAcessToken();
      // res.status(200).json({
      //   success: true,
      //   token,
      // });
      user.isVerified = true;
      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(400, error.message));
    }
  }
);

//logout user

export const logoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });
      res.status(200).json({
        success: true,
        message: "User Logout successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(400, error.message));
    }
  }
);
