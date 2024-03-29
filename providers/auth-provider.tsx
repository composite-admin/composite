"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore, { userStore } from "@/store/auth/AuthStore";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = userStore();
  const router = useRouter();
  useEffect(() => {
    const handleRedirect = () => {
      if (!token) {
        router.push("/login");
      } else {
        router.push("/");
      }
    };

    handleRedirect();
  }, [token, router]);

  return <>{children}</>;
};

export default AuthProvider;
