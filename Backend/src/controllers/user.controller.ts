import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import jsonwebtoken, { Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import { CatchAsyncError } from "../middlewares/catchAsynchErrors";
// Register a user => /api/v1/register
import dotenv from "dotenv";
import sendMail from "./sendMail";
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
        });
      } catch (error: any) {}
      res.status(201).json({
        success: true,
        message: "Account Registered Successfully",
        activationToken: activationToken.token,
      });
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
  const token = jsonwebtoken.sign(
    { user, activationCode },
    process.env.SECRET_KEY as Secret,
    {
      expiresIn: "5m",
    }
  );
  return { token, activationCode };
};
