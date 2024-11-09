import mongoose, { Document, Model, Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>; // you can also use Array<ObjectId> if you want to store ObjectId of courses
  comparePassword: (enteredPassword: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      // maxLength: [30, "Your name cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      // match: [emailRegexPattern, "Please enter a valid email address"],
      validiate: {
        validator: function (email: string) {
          return emailRegexPattern.test(email);
        },
        message: "Please enter a valid email address",
        unique: true,
      },
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Your password must be longer than 6 characters"],
      select: false, //
    },
    avatar: {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: String,
        // type: Schema.Types.ObjectId,
        // ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

// hash password before saving user
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

// sign access token
userSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "5m",
  });
};

//sign Refresh token
userSchema.methods.SignRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "", {
    expiresIn: "7d",
  });
};

// compare user password
userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  const user = await this.model("User").findById(this._id).select("+password");
  return await bcryptjs.compare(enteredPassword, user.password);
};

const User: Model<IUser> = mongoose.model("User", userSchema);
export default User;
