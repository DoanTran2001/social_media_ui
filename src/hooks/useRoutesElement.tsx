import { useRoutes } from "react-router-dom";
import { path } from "../constants/path";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
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
      )
    }
  ]);
  return routeElement;
}
