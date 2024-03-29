"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { userStore } from "@/store/auth/AuthStore";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { token, userType } = userStore();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const handleRedirect = () => {
      if (!token) {
        router.push("/login");
      } else {
        if (userType === "admin") {
          // Admin can access any route
          router.push("/");
        } else if (userType === "client") {
          const currentPath = pathname;
          if (currentPath.startsWith("/client")) {
            // Client is accessing a valid route
            router.push(currentPath);
          } else {
            // Client is trying to access an invalid route, redirect to /client
            router.push("/client/dashboard");
          }
        } else if (userType === "staff") {
          const currentPath = pathname;
          if (currentPath.startsWith("/staff/dashboard")) {
            // Staff is accessing a valid route
            router.push(currentPath);
          } else {
            // Staff is trying to access an invalid route, redirect to /staff
            router.push("/staff");
          }
        }
      }
    };

    handleRedirect();
  }, [token, userType, router, pathname]);

  return <>{children}</>;
};

export default AuthProvider;


// "email": "bola@composite.com",
//     "password": "composite"
