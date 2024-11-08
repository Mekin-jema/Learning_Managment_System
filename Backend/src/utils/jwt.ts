import dotenv from "dotenv";
import { Response } from "express";
import { IUser } from "../models/user.model";
import { redis } from "../db/redisDatabase";

dotenv.config();

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.SignAcessToken();
  const refreshToken = user.SignRefreshToken();

  //upload session to redis
  redis.set(user._id as string, JSON.stringify(user) as any);

  //parse enviroment variable to integrate with fallback values
  const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "300");
  const refreshTokenExpire = parseInt(
    process.env.REFRESH_TOKEN_EXPIRE || "1200",
    10
  );

  //options for cookies

  const accessTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 1000),
    maxAge: accessTokenExpire * 1000,
    httpOnly: true,
    sameSite: "lax",
  };
  const refreshTokenOptions: ITokenOptions = {
    expires: new Date(Date.now() + accessTokenExpire * 1000),
    maxAge: accessTokenExpire * 1000,
    httpOnly: true,
    sameSite: "lax",
  };

  // only set secure is true in production
  if (process.env.NODE_ENV === "production") {
    accessTokenOptions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({ success: true, user, accessToken });
};
