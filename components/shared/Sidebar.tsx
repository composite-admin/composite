"use client";

import { usePathname } from "next/navigation";
import SidebarLinks, { footerLinks } from "@/utils/links";
import Link from "next/link";
import Image from "next/image";
import { NavLinkType } from "@/utils/types";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<NavLinkType | null>(null);
  const handleToggle = (item: NavLinkType) => {
    setActiveItem(activeItem === item ? null : item);
  };

  return (
    <aside className="py-4 px-8 bg-primaryDark duration-100 h-full flex flex-col overflow-y-scroll fixed top-0 left-0 lg:min-h-screen landscape:w-[13rem]">
      <div className="flex gap-2 items-center pb-5">
        <Image src="/logo.png" alt="logo" width={30} height={30} />
        <h1 className="text-white text-[26px] font-[600]">composite</h1>
      </div>

      <div className="my-4 ">
        {SidebarLinks.map((item: NavLinkType) => {
          const { isCollapsible } = item;
          if (isCollapsible) {
            return (
              <div
                key={item.label}
                className={`flex flex-col gap-3.5 pb-2.5 p-[12px_16px] rounded-md transition-all ${
                  pathname === item.href
                    ? "bg-layer-500 text-primaryLight-500 scale-105"
                    : "text-textColor-500"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-3.5 duration-200 group-hover:scale-105 ">
                    <div>{item.icon}</div>
                    <Link
                      href={item.href}
                      className="text-sm w-32"
                      onClick={() => setActiveItem(null)}
                    >
                      {item.label}
                    </Link>
                  </div>
                  <div className="">
                    <ChevronRight
                      onClick={() => handleToggle(item)}
                      className={`w-full h-5 transition-all cursor-pointer ${
                        activeItem === item ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </div>
                <AnimatePresence initial={false}>
                  {activeItem === item && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{ duration: 0.16, ease: "linear" }}
                      className="rounded-md bg-layer-500 overflow-hidden"
                    >
                      <Link
                        href={item.childHref || ""}
                        className={`py-1.5 ml-2 block transition-all ${
                          pathname === item.childHref
                            ? "text-primaryLight-500"
                            : "text-gray-500"
                        }`}
                        onClick={() => setActiveItem(null)}
                      >
                        <div className="transition-all capitalize text-sm ">
                          {item.childLabel}
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }
          return (
            <Link
              href={item.href}
              key={item.label}
              className={`flex gap-3.5 pb-2.5 p-[12px_16px] rounded-md duration-100 hover:scale-105 ${
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

      <div className="pt-20">
        {footerLinks.map((item: NavLinkType) => {
          return (
            <Link
              href={item.href}
              key={item.label}
              className={`flex gap-3.5 pb-2.5 p-[12px_16px] rounded-md duration-100 hover:scale-105 ${
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
