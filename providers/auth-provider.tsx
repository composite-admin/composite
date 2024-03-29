"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/auth/AuthStore";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();
  const router = useRouter();
  console.log(user);
  useEffect(() => {
    const handleRedirect = () => {
      if (!user) {
        router.push("/login");
      } else {
        router.push("/");
      }
    };

    handleRedirect();
  }, [user, router]);

  return <>{children}</>;
};

export default AuthProvider;
