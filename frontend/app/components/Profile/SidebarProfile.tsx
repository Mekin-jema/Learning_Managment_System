import React from "react";

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
  return <div>SidebarProfile</div>;
};

export default SidebarProfile;
