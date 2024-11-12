//get user by Id
import { redis } from "../db/redisDatabase";
import User from "../models/user.model";
import { Response } from "express";

export const getUserById = async (id: string) => {
  const userJson = await redis.get(id);

  if (userJson) {
    const user = JSON.parse(userJson);
    return user;
  }
  // const user = await User.findById(id);
  // return user;
};
//get user by emails
//get all users

export const getAllUsersService = async (req: Response) => {
  const users = await User.find().sort({ createdAat: -1 });
};
