"use client";
import React from "react";

import { Modal, Box } from "@mui/material";
type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: any;
  Component: any;
  setRoute: (route: string) => void;
};

const CustomModal = ({ open, setOpen, setRoute, Component }: Props) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 shadow py-4 outline-none">
        <Component setRoute={setRoute} />
      </Box>
    </Modal>
  );
};

export default CustomModal;
