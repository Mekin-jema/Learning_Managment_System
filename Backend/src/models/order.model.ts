import mongoose, { Document, Model, Schema } from "mongoose";

interface IOrder extends Document {
  userId: string;
  payment_info: object;
  courseId: string;
}
const orderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },

    payment_info: {
      type: Object,
      required: [true, "Please enter payment info"],
    },
    courseId: {
      type: String,
      required: [true, "Please enter course id"],
    },
  },
  { timestamps: true }
);

const Order: Model<IOrder> = mongoose.model("Order", orderSchema);
export default Order;
