"use client";
import React from "react";
import Heading from "./utils/Heading";

const Page = () => {
  return (
    <div>
      <Heading title="Home" description="Home page" keywords="Home, Page" />
      <p className="bg-white text-black">Hello wrold</p>
    </div>
  );
};

export default Page;
