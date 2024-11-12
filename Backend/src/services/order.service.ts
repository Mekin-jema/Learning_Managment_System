import { NextFunction } from "express";
import { CatchAsyncError } from "../middlewares/catchAsynchErrors";
import Order from "../models/order.model";

//create new order

export const newOrder = CatchAsyncError(
  async (data: any, next: NextFunction) => {
    const order = await Order.create(data);
    next(order);
  }
);
