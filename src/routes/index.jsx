import { createBrowserRouter, Outlet } from "react-router-dom";
import { AuthLayout, DashboardLayout } from "@/layouts";
import { AdminSidbar, UserSidebar, SecuritySidebar } from "@/constants";
import { AdminDashBoard } from "@/pages";
import {Login,Registration,ResidentManagement,ForgetPassword,OtpPage,ResetPassword,Userlogin,} from "@/pages";
import VisitorTracking from "../pages/Security/VisitorTracking";
import EmergencyManagement from "../pages/Security/EmergencyManagement";
import { Owner } from "../components/Resident_management/Owner";
import Tenant from "../components/Resident_management/Tenant";
import { lazy } from "react";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import ProfilePage from "../components/ProfilePopup/ProfilePage";
import EditProfilePage from "../components/ProfilePopup/EditProfilePopup";
import ProtectedRoute from "../context/ProtectedRoute";

const AddNote = lazy(() => import("../pages/Admin/FinancialMaintenance/Note"));
const FinancialManagement = lazy(() =>
  import("../pages/Admin/FinancialMaintenance/Income")
);
const Expanse = lazy(() =>
  import("../pages/Admin/FinancialMaintenance/Expanse")
);
const FacilityManagement = lazy(() =>
  import("../pages/Admin/FacilityManagement")
);
const CreactComplaint = lazy(() =>
  import("../pages/Admin/ComplaintTracking/CreateComplaint")
);
const RequestComplaint = lazy(() =>
  import("../pages/Admin/ComplaintTracking/RequestTracking")
);
const SecurityManagement = lazy(() =>
  import("../pages/Admin/SecurityManagement/SecurityProtocols")
);
const VisitorLog = lazy(() =>
  import("../pages/Admin/SecurityManagement/VisitorLogs")
);
const SecurityGuard = lazy(() => import("../pages/Admin/SecurityGuard"));
const Announcement = lazy(() => import("../pages/Admin/Announcement"));
const AccessForums = lazy(() => import("../pages/User/Community/AccessForums"));
const CommunityDiscussion = lazy(() => import("../pages/User/Community/CommunityDiscussion"));
const ParticipationTabs = lazy(() => import("../pages/User/EventsParticipate"));
const MaintenanceInvoices = lazy(() => import("../pages/User/PaymentPortal/MaintenanceInvoices"));
const OtherIncome = lazy(() => import("../pages/User/PaymentPortal/OtherIncome"));
const UserPersonalDetail = lazy(() => import("../pages/User/PersonalDetailsScreen"));
const SecurityProtocolsTable = lazy(() => import("../pages/User/SecurityProtocol"));
const UserComplaintSubmission = lazy(() => import("../pages/User/ServiceAndComplaint"));




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
              element: (<ProtectedRoute allowedRoles={['user']}><DashboardLayout items={UserSidebar} /></ProtectedRoute>),
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
                      element: <CommunityDiscussion />,
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
              element:(<ProtectedRoute allowedRoles={['admin']}><DashboardLayout items={AdminSidbar} /></ProtectedRoute>),
              children: [
                {
                  path: "profile", 
                  element: <ProfilePage /> 
                },
                {
                  path: "editprofile", 
                  element: <EditProfilePage /> 
                },
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
              element:(<ProtectedRoute allowedRoles={['user']}><DashboardLayout items={UserSidebar} /></ProtectedRoute>),
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
          element:(<ProtectedRoute allowedRoles={['security']}><DashboardLayout items={SecuritySidebar} /></ProtectedRoute>),
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
      element: <PageNotFound/>,
    },
    {
      path: "/OtherIncome",
      element: <OtherIncome />,
    },
  ],
  {
    /* Base URL */
    basename: "/",
  }
);

export default DashStackRoute;
