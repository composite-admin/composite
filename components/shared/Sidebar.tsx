"use client";

import { usePathname } from "next/navigation";
import SidebarLinks, { footerLinks } from "@/utils/links";
import Link from "next/link";
import { NavLinkType } from "@/utils/types";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="py-4 px-8 bg-primaryDark h-full flex flex-col">
      <div className="flex gap-2 items-center justify-center pb-5">
        <img src="./logo.png" alt="" />
        <h1 className="text-white text-[26px] font-[600]">composite</h1>
      </div>

      <div className="my-4 ">
        {SidebarLinks.map((item: NavLinkType) => {
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

      <div className="pt-20">
        {footerLinks.map((item: NavLinkType) => {
          return (
            <Link
              href={item.href}
              key={item.label}
              className={`flex gap-3.5 pb-2.5 p-[12px_16px] rounded-md hover:scale-105 ${
                pathname === item.href
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

export default Sidebar;
