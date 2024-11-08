import { createBrowserRouter, Outlet } from "react-router-dom";
import { AuthLayout, DashboardLayout } from "@/layouts";
import { AdminSidbar } from "@/constants";
import { AdminDashBoard } from "@/pages";
import { Login, Registration, ResidentManagement } from "@/pages";
import FinancialManagement from "@/pages/Admin/FinancialMaintenance/Income";
import { FacilityManagement } from "../pages";

const DashStackRoute = createBrowserRouter(
  /* All Paths */
  [
    {
      path: "/",
      children: [
        // User
        {
          element: <Outlet />,
          children: [
            {
              index: true,
              // element: <Dashboard />,
            },
          ],
        },
        // Admin
        {
          path: "admin",
          children: [
            {
              element: <DashboardLayout items={AdminSidbar} />,
              children: [
                {
                  index: true,
                  element: <AdminDashBoard />,
                },
                {
                  path: "residents",
                  element: <ResidentManagement />,
                },
                {
                  path: "financial",
                  children: [
                    {
                      path: "income",
                      element: <FinancialManagement />,
                    },
                    {
                      path: "expense",
                      element: "expense",
                    },
                    {
                      path: "note",
                      element: "note",
                    },
                  ],
                },
                {
                  path: "facility",
                  element: <FacilityManagement />,
                },
                {
                  path: "complaint",
                  children: [
                    {
                      path: "create",
                      element: "Create Complain",
                    },
                    {
                      path: "request",
                      element: "Request",
                    },
                  ],
                },
                {
                  path: "security",
                  children: [
                    {
                      path: "visitors",
                      element: "visitors",
                    },
                    {
                      path: "protocols",
                      element: "protocols",
                    },
                  ],
                },
                {
                  path: "guard",
                  //   element: <AdminDashBoard />,
                },
                {
                  path: "announcement",
                  //   element: <AdminDashBoard />,
                },
              ],
            },
            {
              element: <AuthLayout />,
              children: [{ path: "register", element: <Registration /> }],
            },
          ],
        },
        // Security
        {
          path: "security",
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              //   element: "<AdminDashBoard />",
            },
          ],
        },
        /* Authentication Routes For Super Admin */
        {
          element: <AuthLayout />,
          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "forgot-password",
              element: "ForgotPassword",
            },
            {
              path: "otp",
              element: "Otp",
            },
            {
              path: "reset-password",
              element: "reset-password",
            },
          ],
        },
      ],
    },
    // Error
    {
      /* Default Route (404) */
      path: "*",
      element: <>404 - Page Not Found</>,
    },
  ],
  {
    /* Base URL */
    basename: "/",
  }
);

export default DashStackRoute;
