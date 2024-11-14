// src/routes.tsx
import RootLayout from "@/layouts/RootLayout";
import { DashboardPage } from "@/pages/dashboard";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// Functional component using TypeScript
const AppRouter = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />, // Main layout
      children: [
        {
          index: true,
          element: accessToken ? <DashboardPage /> : <Navigate to={"/login"} />,
        },
        {
          path: "/login",
          element: accessToken ? <Navigate to={"/"} /> : <LoginPage />, // Public route for login
        },
        {
          path: "/register",
          element: accessToken ? <Navigate to={"/"} /> : <RegisterPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default AppRouter;
