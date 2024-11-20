"use client";

import AdminSidbar from "../../components/Admin/AdminSidbar";
import Heading from "../../utils/Heading";
import CreateCourse from "../../components/Admin/Course/CreateCourse";
import Header from "@/app/components/Header";
type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading
        title="Elearing Admin dashboar"
        description="Lorem   "
        keywords="Programming MERN Maachine Learning"
      />
      <div className="flex">
        <div className="4xl:w-[16%] w-1/5">
          <AdminSidbar />
        </div>
        <div className="w-[85%]">
          <CreateCourse />
        </div>
      </div>
    </div>
  );
};

export default page;
