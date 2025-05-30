import React from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import { styles } from "@/app/style/style";
import CourseData from "./CourseData";
import { motion } from "framer-motion";
import Ratings from "../../../utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  isEdit: boolean;
  handleCourseCreate?: any;
};

const CoursePreview = ({
  isEdit,
  active,
  setActive,
  courseData,
  handleCourseCreate,
}: Props) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;
  const discountPercentagePrice = discountPercentage.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

  return (
    <div className="w-[90%]  m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center ">
          <h1 className="pt-5 text-[25px]">
            {courseData?.price === 0 ? "Free" : `$${courseData?.price}`}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            {courseData?.estimatedPrice}$
          </h5>
          <h4 className="pl-5 pt-4 text-[22px]">
            {discountPercentagePrice}% off
          </h4>
        </div>
        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[195px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed !p-4`}
          >
            Buy Now {courseData.price}
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Discount code ..."
            className={`${styles.input} 4xl:!w-[50%]  xl:w-[60%] ml-3 !mt-0`}
          />
          <div
            className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}
          >
            Apply
          </div>
        </div>
        <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl ">
          <motion.ul
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.2 }}
            className="space-y-3"
          >
            <motion.li
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-3 text-lg text-gray-800 font-semibold"
            >
              <span className="text-green-500 text-xl">✔</span>
              Source Code <span className="text-blue-500">Included</span>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-3 text-lg text-gray-800 font-semibold"
            >
              <span className="text-green-500 text-xl">✔</span>
              Certificate of Completion
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-3 text-lg text-gray-800 font-semibold"
            >
              <span className="text-green-500 text-xl">✔</span>
              30-Day Money-Back Guarantee
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-3 text-lg text-gray-800 font-semibold"
            >
              <span className="text-green-500 text-xl">✔</span>
              Full Lifetime Access
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-3 text-lg text-gray-800 font-semibold"
            >
              <span className="text-green-500 text-xl">✔</span>
              Premium Support
            </motion.li>
          </motion.ul>
        </div>
        <div className="w-full">
          <div className="w-full md:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600]">
              {courseData?.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <Ratings rating={3} />
              <h5>0 Reviews</h5>
            </div>
            <h5>0 Students</h5>
          </div>
          <br />
          <h1 className="text-[25px] font-Poppins font-[600]">
            What you will learn from this course
          </h1>
        </div>

        {courseData?.benefits?.map((item: any, index: number) => (
          <div className="w-full flex md:items-center py-2 " key={index}>
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        <h1 className=" text-[25px] font-Poppins font-[600]">
          What are the Prerequiste for startring this course
        </h1>

        {courseData.preRequisites?.map((item: any, index: number) => (
          <div className=" w-full flex md:items-center py-2">
            <div className="w-[15px] mr-1">
              <IoCheckmarkDoneOutline size={20} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        {/* Course descriptin  */}
        <div className="w-full">
          <h1 className=" text-[25px]">Course Details</h1>
          {courseData?.description}
        </div>
        <br />
        <br />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full xl:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] rounded cursor-pointer mt-0"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full xl:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a]  cursor-pointer rounded mt-0"
          onClick={() => createCourse()}
        >
          {isEdit && isEdit ? "Update Course" : "Create"}
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
