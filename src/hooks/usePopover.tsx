import React from "react";

interface PopoverProps {
  idProps?: string;
}

function usePopover({ idProps }: PopoverProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const id = open ? idProps : undefined;
  return {
    open,
    handleClick,
    handleClose,
    anchorEl,
    id,
  };
}

export default usePopover;
