"use client";

import { useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOption from "./CourseOption";

type Props = {};

const CreateCourse = (props: Props) => {
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([""]);
  const [prerequisites, setPrerequisites] = useState([""]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: " Untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestions: "",
    },
  ]);
  return (
    <div className="w-full min-h-screen">
      <div className="w-[80%]">{active === 0 && <CourseInformation />}</div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[1-] top-18 right-0 ">
        <CourseOption active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;