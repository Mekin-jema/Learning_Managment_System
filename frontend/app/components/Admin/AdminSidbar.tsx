"use client"; // Must be the first line

import React, { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";

import {
  HomeOutlined,
  ArrowForwardIos,
  ArrowBackIos,
  PeopleOutLined,
  ReceiptOutlined,
  BarChartOutlined,
  MapOutLined,
  OndemandVideo,
  VideoCall,
  Web,
  Quiz,
  Wysiwyg,
  ManageHistory,
  Settings,
  ExitToApp,
  Groups,
} from "../Admin/sidebar/Icon";

import avatar from "../../../public/avatar.png";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item = ({ title, to, icon, selected, setSelected }: itemProps) => {
  const { theme } = useTheme();
  return (
    <MenuItem
      icon={React.cloneElement(icon, {
        className: theme === "dark" ? "text-white" : "text-black",
      })}
      active={selected === title}
      onClick={() => setSelected(title)}
    >
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [logout, setLoout] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevent server-side rendering issues

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${
            theme === "dark" ? "#111c43 !important" : "#fff !important"
          }`,
        },
        "& .pro-icon-wrapper": {
          background: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: "#8686fb !important",
        },
        "& .pro-menu-item.active": {
          color: "#8686fb !important",
        },
        "& .pro-item.active": {
          color: "#8686fb !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 28px 10px",
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: `${theme === "dark" ? "#fff" : "inherit"}`,
        },
      }}
      className="!bg-white dark:bg-[#111c43]"
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          height: "100vh",
          left: 0,
          top: 0,
          width: isCollapsed ? "0%" : "16%",
          zIndex: 1000,
        }}
      >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              isCollapsed ? (
                <ArrowForwardIos className="!text-[#fff] !text-2xl" />
              ) : (
                ""
              )
            }
            style={{ margin: "10px 0 20px 0" }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Link href="/">
                  <h3 className="text-[25px] font-Poppins uppercase dark:text-white text-black">
                    Elearning
                  </h3>
                </Link>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <ArrowBackIos className="!text-[#fff] !text-2xl" />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box>
              <Box display="flex" justifyContent="center " alignItems="center">
                <Image
                  src={user && user.avatar ? user.avatar.url : avatar}
                  alt="Profile User"
                  width={100}
                  height={100}
                  className="rounded-full"
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className=" !text-[20px] text-black dark:text-[#ffffffc1]"
                  sx={{ m: "1px 0 0 0" }}
                >
                  {user && user.name}
                </Typography>
                <Typography
                  variant="h6"
                  className=" !text-[20px] text-black dark:text-[#ffffffc1] capitalize"
                  sx={{ m: "1px 0 0 0" }}
                >
                  {user && user.role}
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400] "
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item
              title="Users "
              to="/admin/all-users"
              selected={selected}
              setSelected={setSelected}
              icon={<Groups />}
            />
            <Item
              title="Invoices "
              to="/admin/invoices"
              selected={selected}
              setSelected={setSelected}
              icon={<ReceiptOutlined />}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400] "
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item
              title="Create Course "
              to="/admin/create-course"
              selected={selected}
              setSelected={setSelected}
              icon={<VideoCall />}
            />
            <Item
              title="Live Coures "
              to="/admin/all-courses"
              selected={selected}
              setSelected={setSelected}
              icon={<OndemandVideo />}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400] "
            >
              {!isCollapsed && "Customixation"}
            </Typography>
            <Item
              title="Hero "
              to="/admin/hero"
              selected={selected}
              setSelected={setSelected}
              icon={<Web />}
            />

            <Item
              title="FAQ"
              to="/admin/faq"
              selected={selected}
              setSelected={setSelected}
              icon={<Quiz />}
            />
            <Item
              title="Categories"
              to="/admin/categories"
              selected={selected}
              setSelected={setSelected}
              icon={<Wysiwyg />}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400] "
            >
              {!isCollapsed && "Conterollers"}
            </Typography>
            <Item
              title="Manage Team"
              to="/admin/team"
              selected={selected}
              setSelected={setSelected}
              icon={<PeopleOutLined />}
            />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 25px" }}
              className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400] "
            >
              {!isCollapsed && "Analaytics"}
            </Typography>
            <Item
              title=" Courses Analytics"
              to="/admin/coures-analytics"
              selected={selected}
              setSelected={setSelected}
              icon={<BarChartOutlined />}
            />
            <Item
              title=" Orders Analytics"
              to="/admin/orders-analytics"
              selected={selected}
              setSelected={setSelected}
              icon={<MapOutLined />}
            />
            <Item
              title=" Users Analytics"
              to="/admin/users-analytics"
              selected={selected}
              setSelected={setSelected}
              icon={<ManageHistory />}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
