import mongoose, { set } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl: string = process.env.MONGO_URI || "";
const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data: any) => {
      console.log(`Database connected with ${data.connection.host}`);
    });
  } catch (error: any) {
    console.log("error",error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
