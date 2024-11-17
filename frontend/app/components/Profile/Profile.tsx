"use client";
import React from "react";
import SidebarProfile from "./SidebarProfile";
import { useState } from "react";

type Props = {
  user: any;
};

const Profile = ({ user }: Props) => {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(0);
  const [avatar, setAvatar] = useState(null);
  const logoutHandler = async () => {
    //   localStorage.removeItem("user");
    //   window.location.href = "/login";
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  return (
    <div className=" ">
      <div className="w-[85%] flex mx-auto">
        <div
          className={`w-[60px] md:w-[310px] h-[450px] bg-slate-900 border border-[#ffffff1d] rounded-[5px] shadow-sm ml-[80px] mb-[80px] sticky ${
            scroll ? "top-[120px]" : "top-[30px]"
          }  `}
        >
          <SidebarProfile
            user={user}
            active={active}
            avatar={avatar}
            setActive={setActive}
            logoutHandler={logoutHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
