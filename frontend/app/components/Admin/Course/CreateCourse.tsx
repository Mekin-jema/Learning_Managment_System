"use client";

import { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOption from "./CourseOption";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "@/Redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
type Props = {};

const CreateCourse = (props: Props) => {
  const [createCourse, { isSuccess, error, isLoading }] =
    useCreateCourseMutation();
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
    categories: "",
    // reviews: [],
  });
  const [benefits, setBenefits] = useState([
    { title: "" },
    { title: "mekin" },
    { title: "fjljfl" },
  ]);
  const [preRequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoLength: "20m",
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
  useEffect(() => {
    if (isSuccess) {
      toast.success("Course Created Successfully!");
      redirect("/admin/all-courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error, isLoading]);

  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    //Format benefits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    //Format preRequisites array
    const formattedPrerequisite = preRequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    // Format course content array
    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        videoLength: courseContent.videoLength,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestions,
      })
    );
    // prepare data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      thumbnail: courseInfo.thumbnail,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      preRequisites: formattedPrerequisite,
      courseData: formattedCourseContentData,
      // reviews: courseInfo.reviews,
    };
    // ;
    setCourseData(data);
  };

  const handleCourseCreate = async (e: any) => {
    const data = courseData;

    if (!isLoading) {
      await createCourse(data);
    }
  };
  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            preRequisites={preRequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            isEdit={false}
            courseData={courseData}
            active={active}
            setActive={setActive}
            handleCourseCreate={handleCourseCreate}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[1] top-18 right-0 ">
        <CourseOption active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
