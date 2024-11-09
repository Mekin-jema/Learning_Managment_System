//get user by Id
import User from "../models/user.model";
import { Response } from "express";

export const getUserById = async (id: string) => {
  const user = await User.findById(id);
  return user;
};
//get user by email
