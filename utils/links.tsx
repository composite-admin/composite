import { ContrastIcon } from "lucide-react";
import {
  DashboardIcon,
  ReportsIcon,
  InventoryIcon,
  ProjectIcon,
  ManageStaffIcon,
  SidebarContractorIcon,
  StakeholderIcon,
  HashIcon,
  SettingsIcon,
  SupportIcon,
} from "../components/icons";

export type NavLinkType = {
  href: string;
  label: string;
  icon: React.ReactNode;
  isCollapsible?: boolean;
  children?: NavLinkType[];
};

const SidebarLinks: NavLinkType[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    href: "/reports",
    label: "Reports",
    icon: <ReportsIcon />,
  },

  {
    href: "/inventory",
    label: "Inventory",
    icon: <InventoryIcon />,
  },
  {
      href: "/facility",
      label: "Facility",
      icon: <ContrastIcon />,
  },
  {
    href: "/project",
    label: "Project",
    icon: <ProjectIcon />,
  },

  {
    href: "/suppliers",
    label: "Suppliers",
    icon: <ManageStaffIcon />,
  },
  {
    href: "/contractors",
    label: "Contractors",
    icon: <SidebarContractorIcon />,
  },

  {
    href: "/stakeholders",
    label: "Stakeholders",
    icon: <StakeholderIcon />,
  },

  {
    href: "/workers",
    label: "Workers",
    icon: <HashIcon />,
  },
  {
    href: "/requests",
    label: "Requests",
    icon: <HashIcon />,
  },
  {
    href: "/cash-advance",
    label: "Cash Advance",
    icon: <HashIcon />,
  },
  {
    href: "/consultants",
    label: "Consultants",
    icon: <ManageStaffIcon />,
  },
  {
    href: "/manage-staff",
    label: "Manage Staff",
    icon: <ManageStaffIcon />,
  },

  {
    href: "/manage-client",
    label: "Manage Client",
    icon: <SidebarContractorIcon />,
  },
];

export default SidebarLinks;

export const footerLinks: NavLinkType[] = [
  {
    href: "/support",
    label: "Support",
    icon: <SupportIcon />,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: <SettingsIcon />,
  },
];
