// Add "use client"; at the very beginning of the file
"use client";

import DashboeardHero from "@/app/components/Admin/sidebar/DashboeardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import AdminSidbar from "../../components/Admin/AdminSidbar";
import AllUsers from "../../components/Admin/Course/AllUsers";

type Props = {};

const Page = (props: Props) => {
  // Capitalize component name for convention
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearn - Admin"
          description="Elearning is a platform for students to learn and get help from teachers."
          keywords="Programming, MERN, Redux, Machine Learning"
        />
        <div className="flex h-screen">
          <div className="w-1/5 xl:w-[16%]">
            <AdminSidbar />
          </div>
          <div className="w-[85%]">
            <DashboeardHero />
            <AllUsers />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page; // Ensure the component name matches the export
