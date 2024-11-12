import { NextFunction, Response } from "express";
import { CatchAsyncError } from "../middlewares/catchAsynchErrors";
import Order from "../models/order.model";

//create new order

export const newOrder = CatchAsyncError(
  async (data: any, res: Response, next: NextFunction) => {
    const order = await Order.create(data);
    res.status(201).json({
      success: true,
      order: data,
    });
  }
);

//get  all orders
export const getAllOrdersService = async (res: Response) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.status(201).json({
    success: true,
    data: orders,
  });
  return orders;
};
