"use client";

import { usePathname } from "next/navigation";
// import  { footerLinks } from "@/utils/links";
import Link from "next/link";
import Image from "next/image";
import { NavLinkType } from "@/utils/types";
import {
  DashboardIcon,
  HashIcon,
  InventoryNewIcon,
  ProjectIcon,
  ReportsIcon,
  SettingsIcon,
  SidebarContractorIcon,
  StakeholderIcon,
  SuppliersNewIcon,
} from "../icons";
import { userStore } from "@/store/auth/AuthStore";
import { useGetStaffPrivileges } from "@/hooks/useSelectOptions";
import { useEffect, useMemo } from "react";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";
import { CalendarSearchIcon, HomeIcon } from "lucide-react";

export const StaffSidebarLinks: NavLinkType[] = [
  {
    href: "/staff/dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
    isAllowed: true,
  },

  {
    href: "/staff/requests",
    label: "Requests",
    icon: <HashIcon />,
    isAllowed: true,
  },
  {
    href: "/staff/cash-advance",
    label: "Cash Advance",
    icon: <CalendarSearchIcon />,
    isAllowed: true,
  },

  {
    href: "/staff/reports",
    label: "Reports",
    icon: <ReportsIcon />,
    isAllowed: false,
  },
  {
    href: "/staff/facility",
    label: "Facility",
    icon: <HomeIcon />,
    isAllowed: false,
  },

  {
    href: "/staff/inventory",
    label: "Inventory",
    isAllowed: false,
    icon: <InventoryNewIcon />,
  },

  {
    href: "/staff/project",
    label: "Project",
    icon: <ProjectIcon />,
    isAllowed: false,
  },

  {
    href: "/staff/suppliers",
    label: "Supplier",
    icon: <SuppliersNewIcon />,
    isAllowed: false,
  },

  {
    href: "/staff/stakeholders",
    label: "Stakeholder",
    icon: <StakeholderIcon />,
    isAllowed: false,
  },

  {
    href: "/staff/contractors",
    label: "Contractor",
    icon: <SidebarContractorIcon />,
    isAllowed: false,
  },

  {
    href: "/staff/manage-staff",
    label: "Staff",
    icon: <StakeholderIcon />,
    isAllowed: false,
  },

  {
    href: "/staff/manage-client",
    label: "Client",
    icon: <HashIcon />,
    isAllowed: false,
  },

  {
    href: "/staff/consultants",
    label: "consultant",
    icon: <SettingsIcon />,
    isAllowed: false,
  },
  {
    href: "/staff/workers",
    label: "Worker",
    icon: <HashIcon />,
    isAllowed: false,
  },
  {
    href: "/staff/change-password",
    label: "Change Password",
    icon: <SettingsIcon />,
    isAllowed: true,
  },
];

const StaffSidebar = () => {
  const pathname = usePathname();
  const { userId } = userStore();
  const { setData, data } = useStaffPrivilegeStore();
  const { isLoading, staffPrivileges } = useGetStaffPrivileges(userId!);
  useEffect(() => {
    setData(staffPrivileges);
  }, [staffPrivileges]);
  const updatedLinks = useMemo(() => {
    if (!staffPrivileges) return StaffSidebarLinks;

    const staffPriviWithView = staffPrivileges.filter(
      (item: any) => item.can_view === 1 || item.can_view === true
    );
    const staffPriviTypes = staffPriviWithView.map((item: any) =>
      item.type.toLowerCase()
    );

    return StaffSidebarLinks.map((link) => ({
      ...link,
      isAllowed:
        link.isAllowed || staffPriviTypes.includes(link.label.toLowerCase()),
    }));
  }, [staffPrivileges]);
  return (
    <aside className="py-4 px-8 bg-primaryDark h-full flex flex-col">
      <div className="flex gap-2 items-center justify-center pb-5">
        <Image src="/./logo.png" alt="" unoptimized width={30} height={30} />
        <h1 className="text-white text-[26px] font-[600]">composite</h1>
      </div>

      <div className="my-4 flex-1">
        {updatedLinks.map((item: NavLinkType) => {
          if (item.isAllowed) {
            return (
              <Link
                href={item.href}
                key={item.label}
                className={`flex gap-3.5 pb-2.5 p-[12px_16px] rounded-md hover:scale-105 ${
                  pathname === item.href || pathname?.includes(item.href)
                    ? "bg-layer-500 text-primaryLight-500 scale-105"
                    : "text-textColor-500"
                }`}
              >
                <div>{item.icon}</div>
                <p className=" text-sm capitalize">{item.label}</p>
              </Link>
            );
          }
        })}
      </div>
    </aside>
  );
};

export default StaffSidebar;
