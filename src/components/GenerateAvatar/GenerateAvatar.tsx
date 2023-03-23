import React from "react";
import Avatar from "@mui/material/Avatar";
import { generateNameAvatar } from "../../utils/utils";

interface GenerateAvatarProps {
  avatar?: string;
  name: string;
}

function GenerateAvatar({ avatar, name }: GenerateAvatarProps) {
  return (
    <>{avatar ? <Avatar alt={name} src={avatar} /> : <Avatar>{generateNameAvatar(name)}</Avatar>}</>
  );
}

export default GenerateAvatar;
