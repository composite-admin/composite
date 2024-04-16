"use client";
import { userStore } from "@/store/auth/AuthStore";
import { HiOutlineBell } from "react-icons/hi2";
import { RiSearch2Line } from "react-icons/ri";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Drop from "./Drop";
import DropContent from "@/components/shared/Drop";

const TopNav = () => {
  const { userType, username } = userStore();

  const [showDrop, setShowDrop] = useState(false);

  const updateDrop = (update: boolean) => setShowDrop(update);

  return (
    <div className="bg-white py-3 px-8 flex items-center justify-between border-b border-borderColor">
      <div className="bg-grey-500 flex items-center gap-3 px-4 rounded-lg min-w-[30rem]">
        <RiSearch2Line className="text-lg" />
        <input
          type="text"
          className="bg-transparent flex-grow outline-none py-3"
          placeholder="Search any code from project, tenant, request..."
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <div className="flex w-[40px] h-[40px] bg-grey  items-center justify-center rounded-full">
          <HiOutlineBell className="text-xl" />
        </div>

        <div className="relative">
          <div
            className="flex items-center gap-4 cursor-pointer py-1 px-3 duration-300 hover:bg-zinc-50 rounded-xl"
            onClick={() => setShowDrop((prev) => !prev)}
          >
            <div className="size-[40px] rounded-full overflow-hidden">
              <Image
                className="w-full h-full  object-cover"
                src="https://variety.com/wp-content/uploads/2023/06/avatar-1.jpg?w=1000&h=563&crop=1&resize=681%2C383"
                alt="profile"
                width={50}
                height={50}
              />
            </div>

            <div className="text-sm">
              <p className="text-[#344054] capitalize font-semibold">{username}</p>
              <p className="text-[#667185] capitalize">{userType}</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {showDrop && (
              <DropContent isOpen={showDrop} onClose={() => setShowDrop(false)}>
                <Drop />
              </DropContent>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
