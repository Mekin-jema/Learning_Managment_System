import mongoose, { Document, Model, Schema } from "mongoose";

interface INotification extends Document {
  title: string;
  message: string;
  status: string;
  userId: string;
}

const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "unread",
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Notifiation: Model<INotification> = mongoose.model(
  "Notification",
  notificationSchema
);

export default Notifiation;
