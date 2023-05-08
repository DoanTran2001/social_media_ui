import Cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";
import { FC, ReactNode } from "react";
import { GradientType } from "../types/utils.type";

export const generateNameAvatar = (name: string): string => {
  const result = name.trim().split(" ");
  return result.length === 1
    ? result[0][0]
    : `${result[0][0]}${result[result.length - 1][0]}`;
};

export const getTokenFromCookie = () => {
  const token = Cookies.get("access_token");
  return token;
};

export const getCookie = (name: string) => {
  const cookieStr = document.cookie;
  const cookies = cookieStr.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
};

const weekDays = [
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
  "Chủ nhật",
];

export const getDate = (date: Date) => {
  const dayOfWeek = weekDays[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const mimute = date.getMinutes();
  return `${dayOfWeek}, ${dayOfMonth} tháng ${month}, ${year} lúc ${hours}:${mimute}`;
};

export const generateDateOfBirth = (dateofbirth: string) => {
  const date = new Date(dateofbirth);
  const dayOfMonth = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${dayOfMonth} tháng ${month}, ${year}`;
};

export const getMonthsFrom = (month: number) => {
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const startIdx = months.indexOf(month);
  const result = [...months.slice(startIdx), ...months.slice(0, startIdx)];
  return result;
};

export const gradientData: GradientType = {
  gradient1: ["#c31432", "yellow"],
  gradient2: ["#00C9FF", "#92FE9D"],
  gradient3: ["#FC466B", "#3F5EFB"],
  gradient4: ["#f8ff00 ", "#3ad59f"],
  gradient5: ["#8EC5FC", "#E0C3FC"],
  gradient6: ["#4158D0 ", "#FFCC70"],
  gradient7: ["#30cfd0", "#330867"],
  gradient8: ["#00DBDE", "#FC00FF"],
  gradient9: ["rgba(244,37,243,1)", "rgba(244,87,1,1)", "rgba(255,204,37,1)", "rgba(20,196,6,1)"],
  gradient10: ["rgba(201,0,169,1)", "rgba(144,1,1,1)"],
};

export const randomGradient = (deg: string) => {
  const keys = Object.keys(gradientData);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const randomGradient = gradientData[randomKey];
  return `linear-gradient(${deg}, ${randomGradient.join(", ")})`
};

// background-color: #00DBDE;
// background-image: linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%);
// background-image: linear-gradient( 69.7deg,  rgba(244,37,243,1) 1.4%, rgba(244,87,1,1) 36.2%, rgba(255,204,37,1) 72.2%, rgba(20,196,6,1) 113% );
// background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(201,0,169,1) 0%, rgba(144,1,1,1) 90% );