import { createBrowserRouter, Outlet } from "react-router-dom";
import { AuthLayout, DashboardLayout } from "@/layouts";
import { AdminSidbar, UserSidebar, SecuritySidebar } from "@/constants";
import { AdminDashBoard } from "@/pages";
import {
  Login,
  Registration,
  ResidentManagement,
  ForgetPassword,
  OtpPage,
  Resetpassword,
} from "@/pages";
import FinancialManagement from "@/pages/Admin/FinancialMaintenance/Income";
import { Announcement, FacilityManagement } from "../pages";
import { CreactComplaint } from "../pages/Admin/ComplaintTracking/CreateComplaint";
import SecurityManagement from "../pages/Admin/SecurityManagement/SecurityProtocols";
import Expanse from "../pages/Admin/FinancialMaintenance/Expanse";
import { AddNote } from "../pages/Admin/FinancialMaintenance/Note";
import { RequestComplaint } from "../pages/Admin/ComplaintTracking/RequestTracking";
import VisitorLog from "../pages/Admin/SecurityManagement/VisitorLogs";
import SecurityGuard from "../pages/Admin/SecurityGuard";
import UserPersonalDetail from "../pages/User/PersonalDetailsScreen";
import UserComplaintSubmission from "../pages/User/ServiceAndComplaint";
import ParticipationTabs from "../pages/User/EventsParticipate";
import MaintenanceInvoices from "../pages/User/PaymentPortal/MaintenanceInvoices";
import OtherIncome from "../pages/User/PaymentPortal/OtherIncome";
import SecurityProtocolsTable from "../pages/User/SecurityProtocol";
import VisitorTracking from "../pages/Security/VisitorTracking";
import EmergencyManagement from "../pages/Security/EmergencyManagement";
import { Owner } from "../components/Resident_management/Owner";
import Tenant from "../components/Resident_management/Tenant";

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
              element: <DashboardLayout items={UserSidebar} />,
              children: [
                {
                  index: true,
                  element: <AdminDashBoard />,
                },
                {
                  path: "PersonalDetail",
                  element: <UserPersonalDetail />,
                },
                {
                  path: "ServiceAndComplaint",
                  element: <UserComplaintSubmission />,
                },
                {
                  path: "EventsParticipation",
                  element: <ParticipationTabs />,
                },

                {
                  path: "PaymentPortal",
                  children: [
                    {
                      path: "MaintenanceInvoices",
                      element: <MaintenanceInvoices />,
                    },
                    {
                      path: "OtherIncomeInvoice",
                      element: <OtherIncome />,
                    },
                  ],
                },
                {
                  path: "SecurityProtocols",
                  element: <SecurityProtocolsTable />,
                },
              ],
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
                  path: "dashboard",
                  element: <AdminDashBoard />,
                },
                {
                  path: "residents",
                  children: [
                    {
                      index: true,
                      element: <ResidentManagement />,
                    },
                    {
                      path: "OwnerForm",
                      element: <Owner />,
                    },
                    {
                      path:"TenateForm",
                      element:<Tenant/>
                    }
                  ],
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
                      element: <Expanse />,
                    },
                    {
                      path: "note",
                      element: <AddNote />,
                    },
                  ],
                },
                {
                  path: "facility",
                  element: <FacilityManagement />,
                },
                {
                  path: "complaint-tracking",
                  children: [
                    {
                      path: "create",
                      element: <CreactComplaint />,
                    },
                    {
                      path: "request",
                      element: <RequestComplaint />,
                    },
                  ],
                },
                {
                  path: "security",
                  children: [
                    {
                      path: "visitors",
                      element: <VisitorLog />,
                    },
                    {
                      path: "protocols",
                      element: <SecurityManagement />,
                    },
                  ],
                },
                {
                  path: "security-guard",
                  element: <SecurityGuard />,
                },
                {
                  path: "announcement",
                  element: <Announcement />,
                },
              ],
            },
            {
              element: <AuthLayout />,
              children: [{ path: "register", element: <Registration /> }],
            },
          ],
        },
        // User
        {
          path: "user",
          children: [
            {
              element: <DashboardLayout items={UserSidebar} />,
              children: [
                {
                  index: true,
                  element: <AdminDashBoard />,
                },
                {
                  path: "PersonalDetail",
                  element: <UserPersonalDetail />,
                },
                {
                  path: "ServiceAndComplaint",
                  element: <UserComplaintSubmission />,
                },
                {
                  path: "EventsParticipation",
                  element: <ParticipationTabs />,
                },

                {
                  path: "PaymentPortal",
                  children: [
                    {
                      path: "MaintenanceInvoices",
                      element: "Maintenance Invoices",
                    },
                    {
                      path: "OtherIncomeInvoice",
                      element: "Other Income Invoice",
                    },
                  ],
                },
                {
                  path: "SecurityProtocols",
                  element: "Security Protocols",
                },
              ],
            },
          ],
        },
        // Security
        {
          path: "security",
          element: <DashboardLayout items={SecuritySidebar} />,
          children: [
            {
              index: true,
              //   element: "<AdminDashBoard />",
            },
            {
              path: "VisitorTracking",
              element: <VisitorTracking />,
            },
            {
              path: "EmergencyManagement",
              element: <EmergencyManagement />,
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
              element: <ForgetPassword />,
            },
            {
              path: "otp",
              element: <OtpPage />,
            },
            {
              path: "reset-password",
              element: <Resetpassword />,
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
