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
import analyticRoutes from "./routes/analytics.route";
import layoutRoutes from "./routes/layout.route";
import Course from "./models/course.model";
dotenv.config();

const app = express();

const PORT = process.env.PORT;

//middleware
app.use(cookieParser());

app.use(express.json({ limit: "50mb" }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

//

//
app.use(
  "/api/v1",
  userRoutes,
  courseRoutes,
  orderRoutes,
  notficationRoutes,
  analyticRoutes,
  layoutRoutes
);

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

// const courseData = {
//   name: "Full-Stack Web Development",
//   description:
//     "The Full-Stack Web Development course is designed to take you from a complete beginner to a proficient developer capable of building scalable, production-ready web applications. Throughout the course, you will learn the intricacies of front-end and back-end development using the MERN stack: MongoDB, Express.js, React.js, and Node.js. The curriculum emphasizes hands-on learning by guiding you to create real-world projects such as e-commerce platforms, social media applications, and content management systems. You'll gain a solid understanding of core web development concepts, including responsive design, state management, API integration, authentication, and database modeling. This course also introduces you to modern development tools such as Git for version control, Postman for API testing, and deployment services like Vercel and Heroku. Whether you’re starting your career or looking to enhance your skills, this course equips you with the knowledge and experience required to excel in the dynamic field of web development.",
//   price: 299.99,
//   estimatedPrice: 350,
//   tags: "web development, full-stack, MERN",
//   level: "beginner",
//   demoUrl: "https://example.com/courses/fullstack-demo",
//   benefits: [
//     { title: "Learn modern web development tools" },
//     { title: "Build a portfolio project" },
//     { title: "Understand server-side and client-side programming" },
//     { title: "Master the MERN stack for full-stack development" },
//     { title: "Deploy scalable web applications" },
//   ],
//   preRequesites: [
//     { title: "Basic understanding of HTML and CSS" },
//     { title: "Familiarity with JavaScript basics" },
//     { title: "A computer with internet access" },
//   ],
//   reviews: [
//     {
//       rating: 5,
//       comment:
//         "This course is amazing! I learned so much. The explanations are clear, and the projects helped me solidify my understanding of full-stack development.",
//       commentReplies: [],
//     },
//     {
//       rating: 4,
//       comment:
//         "Great course, but I feel it could include more advanced projects for experienced developers.",
//       commentReplies: [
//         {
//           question:
//             "Thank you for the feedback! We’re planning to add an advanced module soon.",
//           questionReplies: [],
//         },
//       ],
//     },
//   ],
//   courseData: [
//     {
//       title: "Introduction to Web Development",
//       description:
//         "This module provides an overview of the web development landscape. You’ll learn about the structure of the web, how browsers work, and the role of HTML, CSS, and JavaScript in creating websites. By the end of this module, you’ll have a clear understanding of how different components interact to form a functioning website.",
//       videoUrl: "https://example.com/videos/intro-to-web-dev.mp4",
//       videoSection: "Module 1",
//       videoLength: 15,
//       videoPlayer: "HTML5",
//       link: [
//         {
//           title: "Course Materials",
//           url: "https://example.com/resources/materials.pdf",
//         },
//         {
//           title: "Web Development Basics",
//           url: "https://developer.mozilla.org/docs/Learn",
//         },
//       ],
//       suggestion:
//         "Review the foundational concepts covered in this module before proceeding.",
//       questions: [
//         {
//           question: "What tools are required for this course?",
//           questionReplies: [
//             {
//               question:
//                 "You will need a code editor like Visual Studio Code, Node.js installed, and Git for version control.",
//               questionReplies: [],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       title: "Building Your First Web Page",
//       description:
//         "This module guides you through the process of creating your first web page from scratch. You’ll write HTML to structure the page, apply CSS to style it, and learn best practices for making your code clean and maintainable. The module includes a mini-project where you’ll create a personal portfolio webpage that highlights your skills and experiences.",
//       videoUrl: "https://example.com/videos/first-web-page.mp4",
//       videoSection: "Module 2",
//       videoLength: 20,
//       videoPlayer: "HTML5",
//       link: [],
//       suggestion:
//         "Experiment with different CSS styles to enhance your design skills.",
//       questions: [],
//     },
//   ],
//   ratings: 4.5,
//   purchased: 1200,
// };

// const addCourseToDatabase = async () => {
//   try {
//     const newCourse = new Course(courseData);
//     await newCourse.save();
//     console.log("Course data added to the database successfully.");
//   } catch (error) {
//     console.error("Error adding course data to the database:", error);
//   }
// };

// addCourseToDatabase();
