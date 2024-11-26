import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./user.model";
interface IComment extends Document {
  user: IUser;
  question: string;
  questionReplies?: IComment[];
}

interface IReview extends Document {
  user: IUser;
  rating: number;
  comment: string;
  commentReplies?: IComment[];
}

interface ILink extends Document {
  title: string;
  url: string;
}

interface ICourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggestion: string;
  questions: IComment[];
}
interface ICourse extends Document {
  name: string;
  description?: string;
  categories: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  level: string; // beginner, intermediate, advanced
  demoUrl: string;
  benefits: { title: string }[];
  preRequisites: { title: string }[];
  reviews: IReview[];
  courseData: ICourseData[];
  ratings?: number;
  purchased?: number;
}
const commentSchema: Schema<IComment> = new mongoose.Schema({
  user: Object,
  questionReplies: [Object],
  question: String,
});

const reviewSchema: Schema<IReview> = new mongoose.Schema({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
  comment: String,
  // commentReplies: [commentSchema],
});

const linkSchema: Schema<ILink> = new mongoose.Schema({
  title: String,
  url: String,
});
const courseDataSchema: Schema<ICourseData> = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  videoThumbnail: Object,
  videoSection: String,
  videoLength: Number,
  videoPlayer: String,
  links: [linkSchema],
  suggestion: String,
  questions: [commentSchema],
});

const courseSchema: Schema<ICourse> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter course title"],
    },
    description: {
      type: String,
      required: [true, "Please enter course description"],
    },
    categories: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Please enter course price"],
      default: 0,
    },
    estimatedPrice: {
      type: Number,
    },
    thumbnail: {
      public_id: {
        // required: [true, "Please enter course thumbnail public_id"],
        type: String,
      },
      url: {
        // required: [true, "Please enter course thumbnail url"],
        type: String,
      },
      // required: [true, "Please enter course thumbnail"],
    },
    tags: {
      type: String,
      required: [true, "Please enter course tags"],
    },
    level: {
      type: String,
      required: [true, "Please enter course level"],
    },
    demoUrl: {
      type: String,
      required: [true, "Please enter course demo url"],
    },
    benefits: [
      {
        title: String,
      },
    ],
    preRequisites: [
      {
        title: String,
      },
    ],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    ratings: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Course: Model<ICourse> = mongoose.model("Course", courseSchema);
export default Course;
