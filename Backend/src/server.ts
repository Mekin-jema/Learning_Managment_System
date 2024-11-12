import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import connectDB from "./db/mongoDatabase"; //.ts extension is not required
import { ErrorMiddleware } from "./middlewares/error";
import userRoutes from "./routes/user.routes";
import courseRoutes from "./routes/course.route";
import orderRoutes from "./routes/order.route";
import notficationRoutes from "./routes/notification";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

//middleware
app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

//

//
app.use("/api/v1", userRoutes, courseRoutes, orderRoutes, notficationRoutes);

app.get("/", (req, res, next) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running  on port ${PORT}`);
  // res.status(200).json({ message: "Server is running" });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Routes${req.originalUrl} not found`) as any;
  err.status = 404;
  next(err);
});

app.use(ErrorMiddleware);
