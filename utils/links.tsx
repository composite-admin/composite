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
  InventoryNewIcon,
  SuppliersNewIcon,
} from "../components/icons";
import { NavLinkType } from "./types";



const SidebarLinks: NavLinkType[] = [
  {
    href: "/",
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
    icon: <InventoryNewIcon />,
    childHref: "/inventory/picked",
    isCollapsible: true,
    childLabel: "Items picked from store",
  },
  {
    href: "/facility",
    label: "Facility",
    icon: <ContrastIcon />,
    isCollapsible: true,
    childLabel: "flats",
    childHref: "/facility/all-flats",
  },
  {
    href: "/project",
    label: "Project",
    icon: <ProjectIcon />,
  },

  {
    href: "/suppliers",
    label: "Suppliers",
    icon: <SuppliersNewIcon />,
  },
  {
    href: "/contractors",
    label: "Contractors",
    icon: <SidebarContractorIcon />,
    isCollapsible: true,
    childHref: "/contractors/pending-project",
    childLabel: "Pending Contractor Project",
  },

  {
    href: "/stakeholders",
    label: "Stakeholders",
    icon: <StakeholderIcon />,
    isCollapsible: true,
    childHref: "/stakeholders/pending-project",
    childLabel: "Pending Stakeholder Project",
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
    isCollapsible: true,
    childHref: "/manage-staff/team-manager/id",
    childLabel: "Project Team Member",
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
