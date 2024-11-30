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
  ResetPassword,
  Userlogin
} from "@/pages";

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
import AccessForums from "../pages/User/Community/AccessForums/Index";
import CommunityDiscussionPage from "../pages/User/Community/CommunityDiscussion";
import { lazy } from "react";

const AddNote = lazy(() => import('../pages/Admin/FinancialMaintenance/Note'));
const FinancialManagement = lazy(() => import('../pages/Admin/FinancialMaintenance/Income'));
const Expanse = lazy(() => import('../pages/Admin/FinancialMaintenance/Expanse'));
const FacilityManagement = lazy(() => import('../pages/Admin/FacilityManagement'));
const CreactComplaint = lazy(() => import('../pages/Admin/ComplaintTracking/CreateComplaint'));
const RequestComplaint = lazy(() => import('../pages/Admin/ComplaintTracking/RequestTracking'));
const SecurityManagement = lazy(() => import('../pages/Admin/SecurityManagement/SecurityProtocols'));
const VisitorLog = lazy(() => import('../pages/Admin/SecurityManagement/VisitorLogs'));
const SecurityGuard = lazy(() => import('../pages/Admin/SecurityGuard'));
const Announcement = lazy(() => import('../pages/Admin/Announcement'));

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
                  path: "Community",
                  children: [
                    {
                      path: "AccessForums",
                      element: <AccessForums />,
                    },
                    {
                      path: "CommunityDiscussion",
                      element: <CommunityDiscussionPage/>,
                    },
                  ],
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
                      path: "TenateForm",
                      element: <Tenant />,
                    },
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
              children: [
                { path: "register", element: <Registration /> },
                {
                  path: "login",
                  element: <Login />,
                },
              ],
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
              element: <Userlogin />,
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
              element: <ResetPassword />,
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
    },{
      path:"/OtherIncome",
      element:<OtherIncome/>
    }
  ],
  {
    /* Base URL */
    basename: "/",
  }
);

export default DashStackRoute;
