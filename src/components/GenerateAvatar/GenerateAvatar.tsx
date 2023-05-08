import React from "react";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { generateNameAvatar } from "../../utils/utils";

type PositionTooltipType =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";
interface GenerateAvatarProps {
  avatar?: string;
  name: string;
  positionTooltip?: PositionTooltipType;
  sx?: {
    width?: string | number;
    height?: string | number;
    fontSize?: string;
  };
}

function GenerateAvatar({
  avatar,
  name,
  sx,
  positionTooltip,
}: GenerateAvatarProps) {
  return (
    <Tooltip title={name} placement={positionTooltip ? positionTooltip : undefined}>
      {avatar ? (
        <Avatar alt={name} src={avatar} sx={sx} />
      ) : (
        <Avatar sx={sx}>{generateNameAvatar(name)}</Avatar>
      )}
    </Tooltip>
  );
}

export default GenerateAvatar;
