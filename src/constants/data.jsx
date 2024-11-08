import { Icons } from "@/constants/icons";

export const AdminSidbar = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Icons.Dashboard,
  },
  {
    title: "Resident Management",
    url: "/admin/residents",
    icon: Icons.Money,
  },
  {
    title: "Financial Management",
    icon: Icons.DollarSquare,
    dricons: Icons.DropDown,
    items: [
      { title: "Income", url: "/admin/financial/income" },
      { title: "Expense", url: "/admin/financial/expense" },
      { title: "Note", url: "/admin/financial/note" },
    ],
  },
  {
    title: "Facility Management",
    url: "/admin/facility",
    icon: Icons.Building,
  },
  {
    title: "Complaint Tracking",
    icon: Icons.SmsTracking,
    dricons: Icons.DropDown,
    items: [
      { title: "Create Complaint", url: "/admin/complaint-tracking/create" },
      { title: "Request Tracking", url: "/admin/complaint-tracking/request" },
    ],
  },
  {
    title: "Security Management",
    url: "/admin/security",
    icon: Icons.ShieldSecurity,
    dricons: Icons.DropDown,
    items:[
      {title: "visitors", url:"/admin/security/visitors"},
      {title: "protocols", url:"/admin/security/protocols"}
    ]
  },
  {
    title: "Security Guard",
    url: "/admin/security-guard",
    icon: Icons.SecurityGuard,
  },
  {
    title: "Announcement",
    url: "/admin/announcement",
    icon: Icons.Announcement,
  },
];
