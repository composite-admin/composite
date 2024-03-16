"use client";

import { usePathname } from "next/navigation";
import SidebarLinks, { NavLinkType } from "@/utils/links";
import Link from "next/link";

const Sidebar = ({ active = 0 }) => {
  const pathname = usePathname();
  return (
    <aside className="py-4 px-8 bg-primaryDark h-full">
      {/* <div className=" min-h-[100vh] p-3 overflow-y-auto"> */}
      <div className="flex gap-2 items-center justify-center">
        <img src="./logo.png" alt="" />
        <h1 className="text-white text-[26px] font-[600]">composite</h1>
      </div>

      <div className="my-4">
        {SidebarLinks.map((item: NavLinkType) => {
          return (
            <Link
              href={item.href}
              key={item.label}
              className={`flex gap-3.5 pb-3.5 p-[12px_16px] rounded-md hover:scale-105 ${
                pathname === item.href
                  ? "bg-layer-500 text-primaryLight-500 scale-105"
                  : "text-white"
              }`}
            >
              <div>{item.icon}</div>
              <p className=" text-[15px]">{item.label}</p>
            </Link>
          );
        })}
      </div>

      {/* <div className="">
        {footItem.map((item: any, i: number) => {
          return (
            <div key={i} className={`flex gap-2 p-[12px_16px] rounded-md`}>
              <img src={item.icon} alt="" />
              <p className="text-white text-sm">{item.title}</p>
            </div>
          );
        })}
      </div> */}
    </aside>
  );
};

export default Sidebar;
