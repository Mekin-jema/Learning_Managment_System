"use client";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Hero";

interface Props {}

const Page: FC<Props> = (props) => {
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
        setRoute={setRoute}
        route={route}
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
      />
      <Hero />
    </div>
  );
};

export default Page;
