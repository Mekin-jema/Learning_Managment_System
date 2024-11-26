"use client";

import AdminSidbar from "@/app/components/Admin/AdminSidbar";
import EditCategories from "@/app/components/Admin/categories/EditCategories";
import DashboeardHero from "@/app/components/Admin/sidebar/DashboeardHero";
import Heading from "@/app/utils/Heading";

import { useParams } from "next/navigation";
const page = () => {
  const params = useParams();
  const id = params?.id;
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
          {/* <CreateCourse /> */}
          <EditCategories />
        </div>
        <DashboeardHero />
      </div>
    </div>
  );
};

export default page;