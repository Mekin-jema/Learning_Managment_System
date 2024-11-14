import React from "react";
import Link from "next/link";
export const navItemsData = [
  { name: "Home", url: "/" },
  { name: "Courses", url: "/courses" },
  { name: "About", url: "/about" },
  { name: "Policy", url: "/policy" },
  { name: "FAQ", url: "/faq" },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItem = ({ activeItem, isMobile }: Props) => {
  return (
    <>
      <div className="hidden sm:flex">
        {navItemsData &&
          navItemsData.map((item, index) => (
            <Link href={`${item.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]" // need modification
                    : "dark:text-white text-black"
                }text-[18px] px-6 font-Poppins font-[400]`}
              >
                {item.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="sm:hidden mt-5 w-full ">
          <div className=" w-full text-center mt-5">
            <Link
              href={"/"}
              className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}
            >
              Elearning
            </Link>
          </div>
          {navItemsData &&
            navItemsData.map((item, index) => (
              <Link href={`${item.url}`} key={index} passHref>
                <span
                  className={`${
                    activeItem === index
                      ? "dark:text-[#37a39a] text-[crimson]" // need modification
                      : "dark:text-white text-black"
                  }text-[18px] px-6 font-Poppins font-[400]`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItem;
