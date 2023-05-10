import { useRoutes } from "react-router-dom";
import { path } from "../constants/path";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Friend from "../pages/Friend";
import FriendList from "../pages/Friend/pages/FriendList";
import Request from "../pages/Friend/pages/Request";
import Suggestions from "../pages/Friend/pages/Suggestions";
import Home from "../pages/Home";
// import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ProfileUser from "../pages/ProfileUser";
// import Register from "../pages/Register";
import Saved from "../pages/Saved";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";
import { Suspense, lazy } from "react";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Birthday from "../pages/Friend/pages/Birthday";
import TermsService from "../pages/TermsService/Terms_Service";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

function ProtectedRoute() {
  const user = useSelector((state: RootState) => state.user?.user?._id);
  return user ? <Outlet /> : <Navigate to={path.login} />;
}

function RejectedRoute() {
  const user = useSelector((state: RootState) => state.user?.user?._id);
  console.log("RejectedRoute ~ user:", user);
  return !user ? <Outlet /> : <Navigate to={path.home} />;
}

export default function useRoutesElement() {
  const routeElement = useRoutes([
    // {
    //   path: "",
    //   element: <RejectedRoute />,
    //   children: [
    {
      path: path.register,
      element: (
        <AuthLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Register />
          </Suspense>
        </AuthLayout>
      ),
    },
    {
      path: path.login,
      element: (
        <AuthLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        </AuthLayout>
      ),
    },
    //   ],
    // },
    {
      path: path.forgotPassword,
      element: (
        <AuthLayout>
          <ForgotPassword />
        </AuthLayout>
      ),
    },
    {
      path: path.terms_service,
      element: <TermsService />,
    },
    {
      path: path.resetPassword,
      element: (
        <AuthLayout>
          <ResetPassword />
        </AuthLayout>
      ),
    },
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
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
          path: path.saved,
          element: (
            <MainLayout>
              <Saved />
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
              element: <Birthday />,
            },
          ],
        },
      ],
    },
  ]);
  return routeElement;
}
