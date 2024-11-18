"use client";
import React from "react";
import Image from "next/image";
import avatarDefault from "../../../public/avatar.png";

import { RiH5, RiLockPasswordFill } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";

type Props = {
  user: any;
  active: number;
  setActive: (active: number) => void;
  avatar: string | null;
  logoutHandler: any;
};

const SidebarProfile = ({
  user,
  active,
  setActive,
  avatar,
  logoutHandler,
}: Props) => {
  return (
    <div className="w-full ">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1
            ? "dark:bg-slate-800 bg-white border-b border-[#d6d3d3] dark:border-[#727272] "
            : "bg-transparent"
        } `}
        onClick={() => setActive(1)}
      >
        <Image
          src={
            user?.avatar || avatar ? user?.avatar.url || avatar : avatarDefault
          }
          alt="avatar"
          width={20}
          height={20}
          className="w-[20px] h-[20px] md:w-[30px] md:h-[30px] cursor-pointer rounded-full" // tailwindcss is not working here
        />
        <h5 className="pl-2 md:block hidden font-Poppins text-black dark:text-white">
          My Account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2
            ? "dark:bg-slate-800 bg-white border-b border-[#d6d3d3] dark:border-[#727272] "
            : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <SiCoursera
          size={20}
          className={`${
            active === 2
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        />
        <h5 className="pl-2 md:block hidden font-Poppins text-black dark:text-white">
          Enrolled Courses
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3
            ? "dark:bg-slate-800 bg-white border-b border-[#d6d3d3] dark:border-[#727272] "
            : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <RiLockPasswordFill
          size={20}
          className={`${
            active === 3
              ? "text-black dark:text-white"
              : "text-gray-500 dark:text-gray-400"
          }`}
        />
        <h5 className="pl-2 md:block hidden font-Poppins text-black dark:text-white">
          Change Password
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer bg-transparent`}
      >
        <AiOutlineLogout
          size={20}
          className="text-gray-500 dark:text-gray-400"
          onClick={() => logoutHandler()}
        />
        <h5 className="pl-2 md:block hidden font-Poppins text-black dark:text-white">
          Logout
        </h5>
      </div>
    </div>
  );
};

export default SidebarProfile;
