"use client";

import { useEffect, useState } from "react";
import CourseInformation from "../Course/CourseInformation";
import CourseOption from "../Course/CourseOption";
import CourseData from "../Course/CourseData";
import CourseContent from "../Course/CourseContent";
import CoursePreview from "../Course/CoursePreview";
import {
  useEditCoursesMutation,
  useGetAllCoursesQuery,
} from "@/Redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
type Props = {
  id: any;
};

const EditCourse = ({ id }: Props) => {
  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [editCourse, { isSuccess, error }] = useEditCoursesMutation();
  const courseToBeEditted = data?.courses.find(
    (course: any) => course._id === id
  );
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (courseToBeEditted) {
      setCourseInfo({
        name: courseToBeEditted.name,
        description: courseToBeEditted.description,
        price: courseToBeEditted.price,
        estimatedPrice: courseToBeEditted?.estimatedPrice,
        tags: courseToBeEditted.tags,
        level: courseToBeEditted.level,
        demoUrl: courseToBeEditted.demoUrl,
        thumbnail: courseToBeEditted?.thumbnail?.url,
      });
      setBenefits(courseToBeEditted.benefits);
      setPrerequisites(courseToBeEditted.preRequisites);
      setCourseContentData(courseToBeEditted.courseData);
    }
  }, [courseToBeEditted]);

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
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [preRequisites, setPrerequisites] = useState([{ title: "" }]);
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
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Course Updated Successfully!");
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
    const newData = {
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
      CourseContent: formattedCourseContentData,
    };

    setCourseData(newData);
  };

  const handleCourseCreate = async () => {
    handleSubmit();
    console.log(courseData);
    await editCourse({ id, courseData });
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
            courseData={courseData}
            active={active}
            setActive={setActive}
            handleCourseCreate={handleCourseCreate}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[1-] top-18 right-0 ">
        <CourseOption active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
