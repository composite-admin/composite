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
  ReportsIcon,
  SettingsIcon,
} from "../icons";
import { userStore } from "@/store/auth/AuthStore";
import { useGetStaffPrivileges } from "@/hooks/useSelectOptions";

export const StaffSidebarLinks: NavLinkType[] = [
  {
    href: "/staff/dashboard",
    label: "Dashboard",
    icon: <DashboardIcon />,
  },

  {
    href: "/staff/requests",
    label: "Requests",
    icon: <HashIcon />,
  },
  {
    href: "/staff/cash-advance",
    label: "Cash Advance",
    icon: <ReportsIcon />,
  },
  {
    href: "/staff/change-password",
    label: "Change Password",
    icon: <SettingsIcon />,
  },

  {
    href: "/staff/reports",
    label: "Profile",
    icon: <ReportsIcon />,
  },

  {
    href: "/staff/inventory",
    label: "Inventory",
    icon: <InventoryNewIcon />,
  },

  { href: "/staff/project", label: "Project", icon: <SettingsIcon /> },

  { href: "/staff/suppliers", label: "Suppliers", icon: <SettingsIcon /> },

  { href: "/staff/contractors", label: "Contractors", icon: <SettingsIcon /> },

  { href: "/staff/stakeholders", label: "Staff", icon: <SettingsIcon /> },

  { href: "/staff/workers", label: "Client", icon: <SettingsIcon /> },

  { href: "/staff/facility", label: "Settings", icon: <SettingsIcon /> },

  { href: "/staff/consultants", label: "Consultants", icon: <SettingsIcon /> },
];

const StaffSidebar = () => {
  const pathname = usePathname();
  const { userId } = userStore();
  const { isLoading, staffPrivileges } = useGetStaffPrivileges(userId!);
  console.log(staffPrivileges);
  return (
    <aside className="py-4 px-8 bg-primaryDark h-full flex flex-col">
      <div className="flex gap-2 items-center justify-center pb-5">
        <Image src="/./logo.png" alt="" unoptimized width={30} height={30} />
        <h1 className="text-white text-[26px] font-[600]">composite</h1>
      </div>

      <div className="my-4 flex-1">
        {StaffSidebarLinks.map((item: NavLinkType) => {
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
              <p className=" text-sm">{item.label}</p>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default StaffSidebar;
