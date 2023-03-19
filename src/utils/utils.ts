import Cookies from "js-cookie";

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
  const mimute = date.getMinutes()
  return `${dayOfWeek}, ${dayOfMonth} tháng ${month}, ${year} lúc ${hours}:${mimute}`
};
