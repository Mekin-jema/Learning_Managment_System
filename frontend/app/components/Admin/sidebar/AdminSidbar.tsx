import React from "react";
import { useEffect, useState } from "react";
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
} from "./Icon";

import avatar from "../../../../public/avatar.png";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";

interface itemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  seetSelected: any;
}

const Item = ({ title, to, icon, selected, seetSelected }: itemProps) => {
  return (
    <MenuItem
      icon={icon}
      active={selected === title}
      onClick={() => seetSelected(title)}
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
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const logoutHandler = () => {
    setLoout(true);
  };
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${
            theme === "dark" ? "#11c43 !important" : "#fff !important"
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
          pading: "5px 35px 28px 10px",
          opacity: 1,
        },
        "& .pro-menu-item": {
          color: `${theme === "dark" && "#000"}`,
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
      />

      <Menu iconShape="square">
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={
            isCollapsed ? (
              <ArrowForwardIos className="!text-[#fff] !text-2xl" />
            ) : // <ArrowBackIos className="!text-[#fff] !text-2xl" />
            undefined
          }
          style={{ margin: "10px 0 20px 0" }}
        >
          {isCollapsed && (
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
      </Menu>
    </Box>
  );
};

type Props = {};

const AdminSidbar = (props: Props) => {
  return <div>AdminSidbar</div>;
};

export default AdminSidbar;
