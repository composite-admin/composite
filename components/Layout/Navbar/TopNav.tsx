"use client";
import useAuthStore, { userStore } from "@/store/auth/AuthStore";
import { HiOutlineBell } from "react-icons/hi2";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

const TopNav = () => {
  const { username, userType } = userStore();
  // const username = getCookie("username");
  const router = useRouter();
  const { logOut } = userStore();

  const logoutAndRedirectToLogin = () => {
    logOut();
    router.push("/login");
  };

  return (
    <div className="bg-white py-3 px-8 flex items-center justify-end border-b border-borderColor">
      <div className="flex items-center justify-end gap-2">
        <div className="relative">
          <div className="flex items-center gap-4 py-1 px-3 duration-300 rounded-xl">
            <div className="size-[40px] rounded-full overflow-hidden flex-shrink-0">
              <Image
                className="w-full h-full  object-cover"
                src="https://variety.com/wp-content/uploads/2023/06/avatar-1.jpg?w=1000&h=563&crop=1&resize=681%2C383"
                alt="profile"
                width={50}
                height={50}
              />
            </div>

            <div className="text-sm">
              <p className="text-[#344054] capitalize font-semibold">
                {username}
              </p>
              <p className="text-[#667185] capitalize">{userType}</p>
            </div>
            <Button onClick={logoutAndRedirectToLogin} className="w-full">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
