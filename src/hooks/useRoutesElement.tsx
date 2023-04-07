import { useRoutes } from "react-router-dom";
import { path } from "../constants/path";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Friend from "../pages/Friend";
import FriendList from "../pages/Friend/pages/FriendList";
import Request from "../pages/Friend/pages/Request";
import Suggestions from "../pages/Friend/pages/Suggestions";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ProfileUser from "../pages/ProfileUser";
import Register from "../pages/Register";

export default function useRoutesElement() {
  const routeElement = useRoutes([
    {
      path: path.register,
      element: (
        <AuthLayout>
          <Register />
        </AuthLayout>
      ),
    },
    {
      path: path.login,
      element: (
        <AuthLayout>
          <Login />
        </AuthLayout>
      ),
    },
    {
      path: path.home,
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      ),
    },
    {
      path: path.profile,
      element: (
        <MainLayout>
          <Profile />
        </MainLayout>
      ),
    },
    {
      path: path.profileUser,
      element: (
        <MainLayout>
          <ProfileUser />
        </MainLayout>
      ),
    },
    {
      path: path.friend,
      element: (
        <MainLayout>
          <Friend />
        </MainLayout>
      ),
      children: [
        {
          path: "/friends/request",
          element: <Request />,
        },
        {
          path: "/friends/suggestions",
          element: <Suggestions />,
        },
        {
          path: "/friends/list",
          element: <FriendList />,
        },
        {
          path: "/friends/birthdays",
          element: <Request />,
        },
      ],
    },
  ]);
  return routeElement;
}
