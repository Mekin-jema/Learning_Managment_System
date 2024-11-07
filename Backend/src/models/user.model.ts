import mongoose, { Document, Model, Schema } from "mongoose";
import bcryptjs from "bcryptjs";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface IUser extends Document {
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
}

const userSchema: Schema = new mongoose.Schema(
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
        required: true,
      },
      url: {
        type: String,
        required: true,
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
});

// compare user password
userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcryptjs.compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);
export default userModel;
