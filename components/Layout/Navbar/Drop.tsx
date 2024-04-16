import { motion } from "framer-motion";
import { FC, useEffect, useRef } from "react";
import { fadeToBottomVariant } from "@/utils/variants";
import { Button } from "../../ui/button";
import { userStore } from "@/store/auth/AuthStore";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Drop: FC = () => {
  const router = useRouter();
  const { logOut } = userStore();

  const logoutAndRedirectToLogin = () => {
    logOut();
    router.push("/login");
  };

  return (
    <motion.div
      className="absolute top-16 right-10 bg-white shadow-xl rounded-lg min-w-[18rem] p-5 space-y-4"
      {...fadeToBottomVariant}
    >
      <div className="fixed top-0 left-0"></div>

      <div className="size-20 rounded-full mx-auto overflow-hidden">
        <Image
          className="w-full h-full object-cover"
          src="https://variety.com/wp-content/uploads/2023/06/avatar-1.jpg?w=1000&h=563&crop=1&resize=681%2C383"
          alt="profile"
          width={100}
          height={100}
        />
      </div>

      <div className="grid gap-1">
        {Array.from({ length: 2 }).map((_, id) => (
          <div key={id} className="border rounded-xl py-4"></div>
        ))}
      </div>
      <div className="grid place-content-center">
        <Button onClick={logoutAndRedirectToLogin} className="w-full">
          Logout
        </Button>
      </div>
    </motion.div>
  );
};

export default Drop;
