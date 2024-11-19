"use client";
import React from "react";
import Heading from "../utils/Heading";
import AdminProtected from "../hooks/adminProtected";
import AdminSidbar from "../components/Admin/sidebar/AdminSidbar";
import DashboardHero from "../components/Admin/sidebar/DashboeardHero";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearin -Admin"
          description=" Elearing is a platform for student sot learn and  get help  from teachers "
          keywords="Programming ,MERN ,Redux, Machine learing"
        />
        <div className="flex  h-[200vh]">
          <div className="4xl:w-[16%] w-1/5">
            <AdminSidbar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
