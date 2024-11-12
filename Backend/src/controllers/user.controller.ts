import { Request, Response, NextFunction, response } from "express";
import User, { IUser } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../db/redisDatabase";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import { CatchAsyncError } from "../middlewares/catchAsynchErrors";
// Register a user => /api/v1/register
import dotenv from "dotenv";
import sendMail from "./sendMail";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
import { getAllUsersService, getUserById } from "../services/user.service";
import { v2 as cloudinary } from "cloudinary";
import { newOrder } from "../services/order.service";

dotenv.config();
interface IRegistirationBody {
  name: string;
  email: string;
  password: string;
  avatar?: {
    public_id: string;
    url: string;
  };
  courses?: string[];
}

export const registrationUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, courses } = req.body;
      const userExist = await User.findOne({ email });

      if (userExist) {
        return next(new ErrorHandler(400, "Email already exists"));
      }
      const user: IRegistirationBody = {
        name,
        email,
        password,
        courses,
      };
      // User.create(user);
      const activationToken = createActivationToken(user);
      const activationCode = activationToken.activationCode;

      const data = { user: { name: user.name }, activationCode };
      // const html = await ejs.renderFile(
      //   path.join(__dirname, "../mails/activation-mail.ejs"),
      //   data
      // );
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

      const { name, email, password, courses } = newUser.user;
      const existUser = await User.findOne({ email });
      if (existUser) {
        return next(new ErrorHandler(400, "Email already Exist "));
      }
      const user = await User.create({
        name,
        email,
        password,
        courses,
      });
      res.status(201).json({ sucess: true, user });
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

      // if (!email || !password) {
      //   return next(new ErrorHandler(400, "Please enter email and password"));
      // }
      const user = await User.findOne({ email }).select("-password");

      if (!user) {
        return next(new ErrorHandler(400, "Invalid email or passsword"));
      }
      const isPsswordMatched = await user.comparePassword(password);
      if (!isPsswordMatched) {
        return next(new ErrorHandler(400, "Invalid email or password"));
      }

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

      if (req.user?._id) {
        await redis.del(req.user._id.toString()); // Here is also another problem i face and fix it
      } else {
        return next(new ErrorHandler(400, "User not authenticated"));
      }

      res.status(200).json({
        success: true,
        message: "User logged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(400, error.message));
    }
  }
);

//update access token
export const updateAccessToken = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_Token = req.cookies.refresh_token as string;
      if (!refresh_Token) {
        return next(
          new ErrorHandler(400, "Please login to access this resource")
        );
      }

      const decoded = jwt.verify(
        refresh_Token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;

      if (!decoded) {
        return next(new ErrorHandler(400, "Could not refresh token"));
      }

      const session = await redis.get(decoded.id as string);
      if (!session) {
        return next(new ErrorHandler(400, "Could not refresh token "));
      }
      const user = JSON.parse(session);
      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        {
          expiresIn: "5m",
        }
      );
      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        {
          expiresIn: "7d",
        }
      );
      req.user = user;
      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);
      res.status(200).json({
        status: "success",
        accessToken,
      });
    } catch (error: any) {
      return next(new ErrorHandler(400, error.message));
    }
  }
);

// get user INfo
export const getUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getUserById(req.user?._id as string);
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(400, error.message));
    }
  }
);

//scocal auth

interface ISocailAuth {
  email: string;
  name: string;
  avatar: string;
}
export const socialAuth = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, avatar } = req.body as ISocailAuth;
      const user = await User.findOne({ email });
      if (!user) {
        const newUser = await User.create({
          email,
          // name:email.split("@")[0],
          name,
          avatar,
          // isVerified:true
        });

        sendToken(newUser, 200, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {
      return next(new ErrorHandler(400, error.message));
    }
  }
);

//update User Info

interface IUpdateUser {
  name?: string;
  email?: string;
  // co: {string}

  // avatar?: {
  //   public_id: string;
  //   url: string;
  // };
}

export const updateUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email } = req.body as IUpdateUser;
      const userId = req.user?._id as string;
      const user = await User.findById(userId);
      if (email && user) {
        const userExist = await User.findOne({ email });
        if (userExist) {
          return next(new ErrorHandler(400, "Email already exists"));
        }
        user.email = email;
      }

      if (name && user) {
        user.name = name;
      }

      // i have added
      // if (avatar && user) {
      //   user.avatar = {
      //     public_id: avatar.public_id,
      //     url: avatar.url,
      //   };
      // }
      await user?.save();
      await redis.set(userId, JSON.stringify(user));

      // const updateData = req.body as IUpdateUser;
      // const user = await User.findByIdAndUpdate(
      //   req.user?._id,
      //   updateData,
      //   {
      //     new: true,
      //     runValidators: true,
      //     useFindAndModify: false,
      //   }
      // );
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(400, error.message));
    }
  }
);

//update password
interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}
export const updatePassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IUpdatePassword;

      const user = await User.findById(req.user?._id).select("+password");
      // incase of google auth  user does not have password
      if (!user?.password) {
        return next(new ErrorHandler(400, "User not does not have password"));
      }
      const isMatched = await user?.comparePassword(oldPassword);
      if (!isMatched) {
        return next(new ErrorHandler(400, "Old password is incorrect"));
      }
      user.password = newPassword;
      await user?.save();
      res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(400, error.message));
    }
  }
);

// updagte avatar image or profile picture

interface IUpdateProfile {
  avatar: string;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const updateProfile = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body as IUpdateProfile;
      const userId = req.user?._id as string;
      const user = await User.findById(userId);

      if (avatar && user) {
        // If the user has an existing avatar, delete it before uploading a new one
        if (user?.avatar?.public_id) {
          const deleteResult = await cloudinary.uploader.destroy(
            user.avatar.public_id
          );
          console.log("Delete result:", deleteResult);
        }

        // Upload the new avatar
        const myCloud = await cloudinary.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
          height: 150,
          crop: "fill",
        });
        user.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      // Save the updated user and cache in Redis with expiration
      await user?.save();
      await redis.set(userId, JSON.stringify(user), "EX", 3600); // Cache expires in 1 hour

      res.status(200).json({ success: true, user });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      return next(new ErrorHandler(500, "Failed to update profile"));
    }
  }
);

// get all users ---only admin

export const getAllUsers = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUsersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(400, error.message));
    }
  }
);
