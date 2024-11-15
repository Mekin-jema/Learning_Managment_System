"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Hero";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Sign-up");

  return (
    <div>
      <Heading
        title="Nextjs LMS"
        description="See Freely with ICT SMC simplified"
        keywords="ICT, SMC, simplified, see, freely, tea"
      />
      <Header
        route={route}
        open={open}
        activeItem={activeItem}
        setRoute={setRoute}
        setOpen={setOpen}
        setActiveItem={setActiveItem}
      />
      <Hero />
    </div>
  );
};

export default Page;
