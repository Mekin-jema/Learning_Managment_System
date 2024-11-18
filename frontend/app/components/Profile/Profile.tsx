"use client";
import React from "react";
import SidebarProfile from "./SidebarProfile";
import { useState } from "react";
import { useLogoutUserQuery } from "@/Redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import ProfileInfo from "./ProfileInfo";

type Props = {
  user: any;
};

const Profile = ({ user }: Props) => {
  const [scroll, setScroll] = useState(false);
  const [active, setActive] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const {} = useLogoutUserQuery(undefined, { skip: !logout ? true : false });
  const logoutHandler = async () => {
    setLogout(true);

    await signOut();
    redirect("/");
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
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[200px] md:w-[310px] h-[450px] dark:bg-slate-900 border ml-0 dark:text-white
             dark:border-[#ffffff1d] rounded-[5px]   border-[#daceceda] bg-white  shadow-lg  dark:shadow-sm md:ml-[80px] mb-[80px] sticky ${
               scroll ? "top-[120px]" : "top-[30px]"
             }   `}
      >
        <SidebarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo user={user} avatar={avatar} />
        </div>
      )}
    </div>
  );
};

export default Profile;
