"use client";
import React from "react";
import Protected from "../hooks/useProtected";
type Props = {};
import Heading from "../utils/Heading";
import Header from "../components/Header";
import { useState } from "react";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Sign-up");
  const { user } = useSelector((state: any) => state.auth);
  return (
    <div>
      <Protected>
        <Heading
          title={`${user.name} Profile`}
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
        <Profile user={user} />
      </Protected>
    </div>
  );
};

export default page;
