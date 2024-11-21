import React from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
};

const CoursePreview = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
}: Props) => {
  return (
    <div className="w-[90%]  m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
