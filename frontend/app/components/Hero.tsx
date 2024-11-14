import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // for animations

type Props = {
  tagline?: string;
  description?: string;
};

const Hero = ({
  tagline = "Improve Your Online Learning Experience Better With Us",
  description = "We have 48k+ online courses and 500k+ registered students. Find your desired course from them.",
}: Props) => {
  return (
    <div className="relative w-full lg:flex items-center bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-800 p-4">
      {/* Image Section */}
      <div className="absolute top-[100px] lg:static lg:flex lg:w-1/2 justify-center lg:items-center hero_animation">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-end pt-[70px] lg:pt-0 z-10"
        >
          <Image
            src={require("../../public/banner image.svg")}
            alt="Banner Image"
            width={1000}
            height={1000}
            className="object-cover xl:max-w-[90%] h-auto z-[10] rounded-full"
          />
        </motion.div>
      </div>

      {/* Text Content Section */}
      <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mt-[15px] px-6">
        <h2 className="dark:text-white text-gray-800 text-3xl lg:text-5xl font-semibold font-Josefin py-4 lg:leading-tight">
          {tagline}
        </h2>
        <p className="dark:text-gray-300 text-lg lg:text-xl mb-6 max-w-lg">
          {description}
        </p>

        {/* Call-to-Action Button */}
        <button className="mt-4 px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
          Explore Courses
        </button>
      </div>

      {/* Animated Background/Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent to-blue-200 opacity-30 dark:opacity-20 z-0"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      ></motion.div>
    </div>
  );
};

export default Hero;
