"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import NavItem from "../utils/NavItem";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import SignUp from "./Signup";
import Login from "./Login";
import { motion } from "framer-motion";
import Verification from "./Verification";

type Props = {
  route: string;
  open: boolean;
  activeItem: number;
  setOpen: (open: boolean) => void;
  setRoute: (route: string) => void;
  setActiveItem: (activeItem: number) => void;
};

const Header = ({
  route,
  open,
  activeItem,
  setRoute,
  setOpen,
  setActiveItem,
}: Props) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        if (window.scrollY > 85) {
          setActive(true);
        } else {
          setActive(false);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };
  return (
    <div className="w-full relative">
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80 dark:shadow"
        }`}
      >
        {/* <div className="w-[95%] md:w-[92%] m-auto py-2 h-full"> */}
        <div className="w-full h-[80px] flex items-center justify-between p-3">
          <div>
            <Link
              href={"/"}
              className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
            >
              Elearning
            </Link>
          </div>
          <div className="flex item-center text-black">
            <NavItem
              activeItem={activeItem}
              isMobile={false}
              setActiveItem={setActiveItem}
            />
            <ThemeSwitcher />
            {/* Only for mobile  */}
            <div className="md:hidden">
              <HiOutlineMenuAlt3
                size={25}
                className="cursor-pointer dark:text-white text-black "
                onClick={() => setOpenSidebar(true)}
              />
            </div>
            <HiOutlineUserCircle
              size={25}
              className="cursor-pointer dark:text-white text-black  hidden md:flex"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
        {/* </div> */}
        {/* Mobile sidebar */}
        {openSidebar && (
          <div
            className=" fixed w-full h-screen top-0 left-0 z-[99999]  dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[99999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0 flex flex-col items-center ">
              <NavItem
                activeItem={activeItem}
                isMobile={true}
                setActiveItem={setActiveItem}
              />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer dark:text-white text-black  "
                onClick={() => setOpen(true)}
              />

              <br />
              <br />
              <p className=" text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright@2023 Elear ing{" "}
              </p>
            </div>
          </div>
        )}
      </div>
      <motion.div
        className="w-full"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {route === "Login" && (
          <>
            {open && (
              <CustomModal
                activeItem={activeItem}
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                Component={Login}
              />
            )}
          </>
        )}
        {route === "Sign-up" && (
          <>
            {open && (
              <CustomModal
                activeItem={activeItem}
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                Component={SignUp}
              />
            )}
          </>
        )}
        {route === "Verification" && (
          <>
            {open && (
              <CustomModal
                activeItem={activeItem}
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                Component={Verification}
              />
            )}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Header;
